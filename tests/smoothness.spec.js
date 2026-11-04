import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{
 await page.goto('/');
 await page.evaluate(()=>{localStorage.clear();localStorage.setItem('signalfeed-v1',JSON.stringify({settingsVersion:2,sources:['design','career','tech','hack'],interests:['Internships','Events','Fellowships']}));});
 await page.reload();
});

test('saving keeps the navigation, card, scroll layer and scroll position in place',async({page})=>{
 await page.locator('[data-action="save"][data-id="forma"]').scrollIntoViewIfNeeded();
 await page.evaluate(()=>{window.retainedUI={nav:document.querySelector('.app-nav'),card:document.querySelector('[data-render-key="opportunity-forma"]'),scroll:document.querySelector('#screen-scroll'),top:document.querySelector('#screen-scroll').scrollTop};});
 await page.locator('[data-action="save"][data-id="forma"]').click();
 expect(await page.evaluate(()=>{const old=window.retainedUI;return old.nav===document.querySelector('.app-nav')&&old.card===document.querySelector('[data-render-key="opportunity-forma"]')&&old.scroll===document.querySelector('#screen-scroll')&&Math.abs(old.top-old.scroll.scrollTop)<2;})).toBe(true);
});

test('community switches stay mounted without replaying the sheet animation or losing scroll',async({page})=>{
 await page.locator('.feed-controls [data-action="sources"]').click();
 const toggle=page.locator('[data-action="modal-source"][data-id="fitness"]');
 await toggle.scrollIntoViewIfNeeded();
 await page.evaluate(()=>{window.retainedUI={sheet:document.querySelector('.sheet'),picker:document.querySelector('.source-picker'),toggle:document.querySelector('[data-action="modal-source"][data-id="fitness"]'),top:document.querySelector('.source-picker').scrollTop};});
 await toggle.click();
 expect(await page.evaluate(()=>{const old=window.retainedUI;return old.sheet===document.querySelector('.sheet')&&old.picker===document.querySelector('.source-picker')&&old.toggle===document.querySelector('[data-action="modal-source"][data-id="fitness"]')&&Math.abs(old.top-old.picker.scrollTop)<2&&old.sheet.getAnimations().length===0;})).toBe(true);
 await expect(toggle).toBeFocused();
});

test('native layout fits a notched screen, has no phone-frame rectangle, and resizes for the keyboard',async({page},info)=>{
 await page.setViewportSize({width:393,height:852});
 await page.evaluate(()=>{document.documentElement.classList.add('native-app');document.documentElement.style.setProperty('--safe-top','62px');document.documentElement.style.setProperty('--safe-bottom','34px');});
 await page.locator('[aria-label="Toggle dark mode"]').click();
 const fits=()=>page.evaluate(()=>{const phone=document.querySelector('.phone'),nav=document.querySelector('.app-nav'),r=phone.getBoundingClientRect(),n=nav.getBoundingClientRect();return Math.abs(r.width-innerWidth)<1&&Math.abs(r.height-innerHeight)<1&&n.bottom<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth&&getComputedStyle(phone).boxShadow==='none';});
 expect(await fits()).toBe(true);
 const navBottom=(await page.locator('.app-nav').boundingBox()).y+(await page.locator('.app-nav').boundingBox()).height;
 expect(navBottom).toBeLessThanOrEqual(852);
 await page.screenshot({path:`demo/${info.project.name}-native-fit-dark.png`});
 await page.locator('.feed-controls [data-action="preferences"]').click();
 await page.locator('[data-action="add-interest"]').click();
 expect(await page.locator('#interest-name').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
 await page.setViewportSize({width:393,height:500});
 const sheet=await page.locator('.sheet').boundingBox();
 expect(sheet.y).toBeGreaterThanOrEqual(62);
 expect(sheet.y+sheet.height).toBeLessThanOrEqual(500);
});
