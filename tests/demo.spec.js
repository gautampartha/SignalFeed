import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {localStorage.clear();localStorage.setItem('signalfeed-v1',JSON.stringify({settingsVersion:2,sources:['tech','design','career','hack'],interests:['Internships','Fellowships','Events']}));});
  await page.reload();
});

test('internship demo goes from noisy chat to a saved role and calendar reminder', async ({ page }) => {
  const errors=[];
  page.on('pageerror', error => errors.push(error.message));
  await page.locator('[data-action="menu"]').count();
  await page.locator('[data-action="tab"][data-id="you"]').click();
  await page.locator('#app [data-action="demo-start"]').click();
  await expect(page.locator('.app-header h1')).toHaveText('Chats');
  await page.locator('.mobile-tour [data-action="demo-next"]').click();
  await expect(page.locator('#source-message')).toContainText('Product Design Intern @ Forma');
  await page.locator('.mobile-tour [data-action="demo-next"]').click();
  await expect(page.locator('.processing')).toBeVisible();
  await expect(page.locator('.processing')).toHaveCount(0, {timeout:6000});
  await expect(page.locator('.opportunity').first()).toContainText('₹30,000 / month');
  await page.locator('.mobile-tour [data-action="demo-next"]').click();
  await expect(page.locator('.segments .selected')).toContainText('Saved');
  await expect(page.locator('.opportunity')).toHaveCount(1);
  await page.locator('.mobile-tour [data-action="demo-next"]').click();
  await expect(page.getByRole('dialog')).toContainText('1 day before');
  await page.locator('[data-action="confirm-reminder"]').click();
  await expect(page.getByRole('dialog')).toContainText('Consider it remembered.');
  const downloadPromise=page.waitForEvent('download');
  await page.locator('[data-action="calendar"]').click();
  const download=await downloadPromise;
  expect(download.suggestedFilename()).toBe('SignalFeed-forma-reminder.ics');
  await page.locator('[data-action="show-reminders"]').click();
  await expect(page.locator('.reminder-card')).toContainText('5 Nov');
  await page.reload();
  await page.locator('[data-action="segment"][data-id="saved"]').click();
  await expect(page.locator('.opportunity')).toHaveCount(1);
  await page.locator('[data-action="segment"][data-id="reminders"]').click();
  await expect(page.locator('.reminder-card')).toContainText('Product Design Intern');
  expect(errors).toEqual([]);
});

test('source selection and interests change the feed, including empty states', async ({ page }) => {
  await expect(page.locator('.opportunity')).toHaveCount(10);
  await page.locator('[data-action="tab"][data-id="communities"]').click();
  for (const id of ['tech','design','career','hack']) await page.locator(`[data-action="toggle-source"][data-id="${id}"]`).click();
  await page.locator('[data-action="tab"][data-id="signal"]').click();
  await expect(page.locator('.opportunity')).toHaveCount(0);
  await expect(page.locator('.setup-card')).toContainText('Add your communities');
  await page.locator('[data-action="tab"][data-id="communities"]').click();
  await page.locator('[data-action="toggle-source"][data-id="career"]').click();
  await page.locator('[data-action="tab"][data-id="signal"]').click();
  await expect(page.locator('.opportunity')).toHaveCount(4);
  await expect(page.locator('.source-row [data-action="source"]').first()).toContainText('VIPS Career Connect');
  await page.locator('.source-row [data-action="source"]').first().click();
  await expect(page.locator('.chat-header')).toContainText('VIPS Career Connect');
  await page.getByRole('button', {name:'Back',exact:true}).click();
  await page.locator('[data-action="tab"][data-id="you"]').click();
  await page.locator('[data-action="interest"][data-id="Internships"]').click();
  await page.locator('[data-action="tab"][data-id="signal"]').click();
  await expect(page.locator('.opportunity')).toHaveCount(0);
});

test('search, original source, message composer and saved state work', async ({ page }) => {
  await page.locator('#search-input').fill('React');
  await expect(page.locator('.opportunity')).toHaveCount(1);
  await expect(page.locator('.opportunity')).toContainText('Frontend Engineering Intern');
  await page.locator('#search-input').fill('Forma');
  await page.locator('[data-action="source"][data-id="forma"]').click();
  await expect(page.locator('.chat-header')).toContainText('Design Circle');
  await expect(page.locator('#source-message')).toContainText('6 Nov');
  await page.locator('#message-input').fill('<script>alert("test")</script> Great opportunity!');
  await page.getByRole('button', {name:'Send mock message'}).click();
  await expect(page.locator('.message.outgoing').last()).toContainText('<script>alert("test")</script>');
  await expect(page.locator('.message script')).toHaveCount(0);
  await page.getByRole('button', {name:'Back',exact:true}).click();
  await page.locator('#search-input').fill('Forma');
  await page.locator('[data-action="save"][data-id="forma"]').click();
  await page.reload();
  await page.locator('[data-action="segment"][data-id="saved"]').click();
  await expect(page.locator('.opportunity')).toContainText('Product Design Intern');
});

test('reminder can be changed and removed; dialog traps keyboard focus', async ({ page }) => {
  await page.locator('[data-action="reminder"][data-id="forma"]').click();
  await page.locator('[data-action="reminder-choice"][data-id="2"]').click();
  await expect(page.locator('[data-action="reminder-choice"][data-id="2"]')).toBeFocused();
  await page.locator('[data-action="confirm-reminder"]').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button',{name:'Close dialog'})).toBeFocused();
  await page.locator('[data-action="confirm-reminder"]').click();
  await page.locator('[data-action="show-reminders"]').click();
  await expect(page.locator('.reminder-card')).toContainText('2h before deadline');
  await page.locator('[data-action="remove-reminder"]').click();
  await expect(page.locator('.reminder-card')).toHaveCount(0);
  await expect(page.locator('.empty-state')).toContainText('A little nudge');
});

test('layouts fit the viewport and capture presentation screenshots', async ({ page }, testInfo) => {
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const phone=await page.locator('.phone').boundingBox();
  expect(phone.width).toBeLessThanOrEqual(page.viewportSize().width);
  await page.screenshot({path:`demo/${testInfo.project.name}-signalfeed.png`,fullPage:true});
  await page.locator('[data-action="tab"][data-id="chats"]').click();
  await page.screenshot({path:`demo/${testInfo.project.name}-chats.png`,fullPage:true});
});
