import {test,expect} from '@playwright/test';

test('every built-in community has multiple announcements and its own content',async({page})=>{
  await page.goto('/');
  await page.locator('[data-action="tab"][data-id="communities"]').click();
  for(const [id,title] of [['tech','Backend Engineering Intern'],['design','Visual Design Intern'],['career','Business Operations Intern'],['hack','Data Analytics Intern'],['sports','Sports Management Intern'],['fitness','Community & Fitness Intern']]){
    await page.locator(`.community-group[data-id="${id}"]`).first().click();
    await expect(page.locator('.message-kind')).not.toHaveCount(0);
    expect(await page.locator('.message-kind').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('#chat-messages')).toContainText(title);
    await page.getByRole('button',{name:'Back',exact:true}).click();
  }
});

test('subgroups have different announcements and keep replies in their own thread',async({page})=>{
  await page.goto('/');
  await page.locator('[data-action="tab"][data-id="communities"]').click();
  await page.locator('.community-group[data-id="tech"][data-group="Announcements"]').click();
  await expect(page.locator('.message-kind')).toHaveCount(3);
  await expect(page.locator('#chat-messages')).toContainText('weekly campus opportunities roundup');
  await page.locator('.chat-group-tabs [data-group="ProdVerse"]').click();
  await expect(page.locator('.message-kind')).toHaveCount(1);
  await expect(page.locator('#chat-messages')).toContainText('Product hackathon check-in');
  await page.locator('#message-input').fill('See you at the practice pitch!');
  await page.getByRole('button',{name:'Send mock message'}).click();
  await expect(page.locator('.message.outgoing')).toContainText('practice pitch');
  await page.locator('.chat-group-tabs [data-group="Announcements"]').click();
  await expect(page.locator('.message.outgoing')).toHaveCount(0);
  await page.locator('.chat-group-tabs [data-group="ProdVerse"]').click();
  await expect(page.locator('.message.outgoing')).toContainText('practice pitch');
});
