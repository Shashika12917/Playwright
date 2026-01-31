// @ts-check
import { test, expect } from '@playwright/test';

// Base URL for the Swift Translator
const BASE_URL = 'https://www.swifttranslator.com/';

// Helper function to perform translation and get output
/**
 * @param {any} page
 * @param {string} input
 * @returns {Promise<string>}
 */
async function translateAndGetOutput(page, input) {
  // Navigate to the page
  await page.goto(BASE_URL);

  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Find the input textbox by its placeholder
  const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');
  await inputField.click();
  await inputField.fill(input);

  // Wait for real-time translation
  await page.waitForTimeout(2500);

  // Click elsewhere to close any suggestion dropdown
  await page.locator('body').click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(500);

  // Get the output from the Sinhala section
  const sinhalaContainer = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
  const outputDiv = sinhalaContainer.locator('xpath=following-sibling::div[1]');

  let output = '';
  try {
    output = await outputDiv.textContent({ timeout: 5000 });
  } catch (e) {
    // Fallback: try to find output by looking for Sinhala text in the right panel
    const rightPanel = page.locator('.col-span-12 >> nth=1').locator('div').filter({ has: page.locator('button:has-text("Copy")') });
    const allText = await rightPanel.locator('..').textContent();
    output = allText?.replace('Sinhala', '').replace('CopyClear', '').trim() || '';
  }

  return output || '';
}

test('Pos_Fun_0001: Convert a short daily phrase', async ({ page }) => {
  const input = 'oyata asanipadha?';
  const expectedOutput = 'ඔයට අසනිපද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0001`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0002: Long mixed-language input with slang + typo causes incorrect conversion', async ({ page }) => {
  const input = 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?';
  const expectedOutput = 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0002`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0003:Convert a short request phrase', async ({ page }) => {
  const input = 'suba dhavasak!';
  const expectedOutput = 'සුබ දවසක්!';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0003`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0004: Sinhala output updates automatically in real-time', async ({ page }) => {
  const input = 'udata yanna.';
  const expectedOutput = 'උඩට යන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0004`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0005: Compound sentence conversion', async ({ page }) => {
  const input = 'api nuvara gihin passe galleth yanavaa.';
  const expectedOutput = 'අපි නුවර ගිහින් පස්සෙ ගල්ලෙත් යනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0005`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0006:  Complex conditional sentence', async ({ page }) => {
  const input = 'gedhara yannata hadhanne';
  const expectedOutput = 'ගෙදර යන්නට හදන්නෙ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0006`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0007: Repeated word expressions used for emphasis', async ({ page }) => {
  const input = 'hari hari';
  const expectedOutput = 'හරි හරි';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0007`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0008:  Convert positive sentence', async ({ page }) => {
  const input = 'mama Eka karanavaa.';
  const expectedOutput = 'මම එක කරනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0008`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0009: Negative sentence form', async ({ page }) => {
  const input = '  mama ehema karannee naehae.';
  const expectedOutput = '  මම එහෙම කරන්නේ නැහැ.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0009`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0010: Polite request', async ({ page }) => {
  const input = 'karunaakaralaa mata poddak ida dhenna puluvandha ?';
  const expectedOutput = 'කරුනාකරලා මට පොඩ්ඩක් ඉඩ දෙන්න පුලුවන්ද ?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0010`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});
test('Pos_Fun_0011: Past tense sentence', async ({ page }) => {
  const input = 'api iiyee udhee pansalata giyaa.';
  const expectedOutput = 'අපි ඊයේ උදේ පන්සලට ගියා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0011`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0012: Pronoun plural usage', async ({ page }) => {
  const input = 'Api sellam karanavaa.';
  const expectedOutput = 'අපි සෙල්ලම් කරනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0012`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0013:Mixed English  ', async ({ page }) => {
  const input = 'Apee team ekata  meeting ekak thiyenavaa.';
  const expectedOutput = 'අපේ team එකට  meeting එකක් තියෙනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0013`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0014:Place  name preserved', async ({ page }) => {
  const input = 'api dhennaa kasaadhee USA vala gamu.';
  const expectedOutput = 'අපි දෙන්නා කසාදේ USA වල ගමු.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0014`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0015: Time format handling', async ({ page }) => {
  const input = '19.00 PM yamu';
  const expectedOutput = '19.00 PM යමු';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0015`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0016:  Currency format', async ({ page }) => {
  const input = 'Rs.2500 dhenna';
  const expectedOutput = 'Rs.2500 දෙන්න';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0016`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0017: Question with English word', async ({ page }) => {
  const input = 'photos tika send karaadhaa?';
  const expectedOutput = 'photos ටික send කරාදා?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0017`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0018: Short confirmation response', async ({ page }) => {
  const input = 'Ow,eka hoDHAyi.';
  const expectedOutput = 'Ow,එක හොඳයි.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0018`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0019:Informal phrasing', async ({ page }) => {
  const input = 'yako ooka magee nemee.';
  const expectedOutput = 'යකො ඕක මගේ නෙමේ.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0019`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0020: Slang expression with punctuation', async ({ page }) => {
  const input = 'niyamayi ban magen suba pethum !! dhennata';
  const expectedOutput = 'නියමයි බන් මගෙන් සුබ පෙතුම් !! දෙන්නට';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0020`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0021: Simple greeting phrase', async ({ page }) => {
  const input = 'dhevi pihitayi!!';
  const expectedOutput = 'දෙවි පිහිටයි!!';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0021`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0022: Date format handling', async ({ page }) => {
  const input = '1/26/2026';
  const expectedOutput = '1/26/2026';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0022`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0023: Common daily expression', async ({ page }) => {
  const input = 'mata kammeli.';
  const expectedOutput = 'මට කම්මෙලි.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0023`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0024:Real-time output update ', async ({ page }) => {
  const input = 'iridhaata nimadu.';
  const expectedOutput = 'ඉරිදාට නිමඩු.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0024`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});
test('Pos_Fun_0025:technical term ', async ({ page }) => {
  const input = 'DATA ON karanna.';
  const expectedOutput = 'DATA ON කරන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0025`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});
test('Neg_Fun_0001:  Misspelled  produces', async ({ page }) => {
  const input = 'oyata kohomdha?';
  const expectedOutput = 'ඔයාට කොහොමද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0001`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0002:  Multiple consecutive spaces', async ({ page }) => {
  const input = 'm a m a i i y ee  id hal aa ka laa na e e  thavama mokuth ';
  const expectedOutput = 'මම ඊයේ ඉදලා කලා නෑ තවම මොකුත්';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0002`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0003: Question form incorrectly converted', async ({ page }) => {
  const input = 'oyata saniipa madhidha';
  const expectedOutput = 'ඔයට සනීප මදිද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0003`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0004: Negative sentence with wrong negation pattern', async ({ page }) => {
  const input = 'mama enna nehe';
  const expectedOutput = 'මම එන්න නැහැ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0004`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0005: Incorrect handling of mixed language', async ({ page }) => {
  const input = 'api eka e order eka cancel karala call ekak damu.';
  const expectedOutput = 'අපි ඒ order එක cancel කරලා call එකක් දාමු.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0005`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0006: Mixed uppercase and lowercase causes errors', async ({ page }) => {
  const input = 'MaMa GeDhArA yAnAvAa. ';
  const expectedOutput = 'මම ගෙදර යනවා. ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0006`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0007: Loss of accuracy in long conversational paragraph with mixed content', async ({ page }) => {
  const input = 'adha udhae indhala mama bohoma busy unaa. office eke meeting thibunaeka passe client kenek call karalaa bohoma amathaka deyakata kathakaranna patan gaththa. mama eka note karaganna hithuwoth spellings hariyata balanna thiyenney nae. passe mama gedhara enakota traffic bohoma thibuna nisa late unaa.';
  const expectedOutput = 'අද උදේ ඉදල මම බොහොම කාර්යබහුල උනා. office eke හමුවක් තිබුන එක පස්සෙ පරිබොගික කෙනෙක් call කරලා බොහොම අමතක දෙයකට කතා කරන්න පටන් ගත්ත. මම එක සටහන් කරගන්න හිතුවොත් අකුරු හරියට බලන්න තියෙන්නෙ නැ. පස්සෙ මම ගෙදර එනකොට වාහන තදබදය බොහොම තිබුන නිස පරක්කු උනා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0007`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0008: Compound sentence partially translated', async ({ page }) => {
  const input = 'api eka iwara karannh thama hitiye eth beri una ';
  const expectedOutput = 'අපි එක ඉවර කරන්න  තමා හිටියෙ එත් බැරි උනා ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0008`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0009: Unsupported emoji input', async ({ page }) => {
  const input = 'mama 😎 yanavaa';
  const expectedOutput = 'මම යනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0009`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0010: Pronoun perspective changed', async ({ page }) => {
  const input = 'api passe kathaa karamu';
  const expectedOutput = 'අපි ඔක්කොම නැන්දලාගෙ ගෙදර ගියොත් වැලේ තියෙන රෙදි ටික ගන්නෙ කව්ද?අපි පස්සේ කතා කරමු.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0010`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});
test('Neg_Fun_0011: Special characters break the conversion', async ({ page }) => {
  const input = 'mama @welata giya  #';
  const expectedOutput = 'මම @වෙලට ගියා  #';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0011`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});



