import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload();});

test('sources are opt-in; Sports matches only selected sports communities',async({page})=>{
  await expect(page.locator('.opportunity')).toHaveCount(0);
  await expect(page.locator('.setup-card')).toContainText('Nothing is included until you add it');
  await page.locator('.feed-controls [data-action="preferences"]').click();
  await page.locator('[data-action="interest"][data-id="Sports"]').click();
  await page.getByRole('button',{name:'Close dialog'}).click();
  await expect(page.locator('.opportunity')).toHaveCount(0);
  await page.locator('.feed-controls [data-action="sources"]').click();
  await expect(page.locator('[role="switch"][aria-checked="true"]')).toHaveCount(0);
  await page.locator('[data-action="modal-source"][data-id="sports"]').click();
  await page.getByRole('button',{name:'Close dialog'}).click();
  await expect(page.locator('.opportunity')).toHaveCount(3);
  await expect(page.locator('.opportunity').first()).toContainText('Football Cup');
  await expect(page.locator('.opportunity')).not.toContainText(['Forma','Design Intern']);
  await page.reload();
  await expect(page.locator('.opportunity')).toHaveCount(3);
  await page.locator('.feed-controls [data-action="sources"]').click();
  await page.locator('[data-action="modal-source"][data-id="sports"]').click();
  await page.getByRole('button',{name:'Close dialog'}).click();
  await expect(page.locator('.opportunity')).toHaveCount(0);
});

test('custom interests and communities persist, with safe text and no unrelated posts',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.locator('.feed-controls [data-action="preferences"]').click();
  await page.locator('[data-action="add-interest"]').click();
  await page.locator('#interest-name').fill('Cricket');
  await page.locator('#interest-form button[type="submit"]').click();
  await expect(page.locator('[data-action="interest"][data-id="Cricket"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-action="sources"]').last().click();
  await page.locator('[data-action="create-community"]').click();
  await page.locator('#community-name').fill('My cricket <club>');
  await page.locator('#community-topic').fill('Cricket');
  await page.locator('#community-announcement').fill('Friday cricket tryouts');
  await page.locator('#community-form button[type="submit"]').click();
  await expect(page.locator('.source-picker')).toContainText('My cricket <club>');
  await page.getByRole('button',{name:'Close dialog'}).click();
  await expect(page.locator('.opportunity')).toHaveCount(1);
  await expect(page.locator('.opportunity')).toContainText('Friday cricket tryouts');
  await expect(page.locator('.opportunity club')).toHaveCount(0);
  await page.locator('[data-action="source"]').click();
  await expect(page.locator('.chat-header')).toContainText('My cricket <club>');
  await expect(page.locator('#source-message')).toContainText('Friday cricket tryouts');
  await page.reload();
  await expect(page.locator('.opportunity')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('dark mode persists and the guided demo does not opt in personal sources',async({page},info)=>{
  await page.locator('[aria-label="Toggle dark mode"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.screenshot({path:`demo/${info.project.name}-dark-personalization.png`,fullPage:true});
  await page.locator('[data-action="tab"][data-id="you"]').click();
  await page.locator('#app [data-action="demo-start"]').click();
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('signalfeed-v1')));
  expect(stored.sources).toEqual([]);expect(stored.interests).toEqual([]);
  await page.locator('.mobile-tour [data-action="demo-exit"]').click();
  await page.locator('[data-action="tab"][data-id="signal"]').click();
  await expect(page.locator('.setup-card')).toBeVisible();
});

test('existing users must explicitly choose sources after the update',async({page})=>{
  await page.evaluate(()=>localStorage.setItem('signalfeed-v1',JSON.stringify({sources:['tech','design','career','hack'],interests:['Internships'],saved:['forma'],reminders:[]})));
  await page.reload();
  await expect(page.locator('.setup-card')).toBeVisible();
  const data=await page.evaluate(()=>JSON.parse(localStorage.getItem('signalfeed-v1')));
  expect(data.sources).toEqual([]);expect(data.saved).toEqual(['forma']);
});
