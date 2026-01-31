# Swift Translator - Singlish to Sinhala Conversion Testing Suite

## Project Overview

This is an automated testing project for the **Swift Translator** web application (https://www.swifttranslator.com/), which converts Singlish (romanized Sinhala) text to Sinhala script. The project uses **Playwright**, a powerful browser automation framework, to validate the translation functionality through a comprehensive suite of end-to-end tests.

### What is Singlish?
Singlish is a phonetic romanization of the Sinhala language, commonly used in casual digital communication in Sri Lanka. For example:
- **Singlish Input**: `oyata kohomdha?`
- **Sinhala Output**: `ඔයාට කොහොමද?` (How are you?)

## Project Structure

```
IT23286900/
├── README.md                 # This file
├── package.json             # Project dependencies and metadata
├── playwright.config.js     # Playwright test configuration
├── tests/
│   └── example.spec.js      # Main test suite with 36 test cases
├── playwright-report/       # HTML test reports (auto-generated)
│   ├── index.html
│   └── data/
└── test-results/            # Test result details and error contexts
    └── [test-specific folders with error-context.md files]
```

## Features

### Test Coverage
The test suite includes **36 test cases** divided into two categories:

#### ✅ Positive Functional Tests (Pos_Fun_0001 - Pos_Fun_0025)
These tests validate correct translation behavior for various input scenarios:
- **Simple phrases**: Daily conversations, greetings, and simple requests
- **Complex structures**: Compound sentences, conditional statements, past tense
- **Mixed content**: English words mixed with Singlish
- **Special formats**: Times (19.00 PM), currency (Rs.2500), dates (1/26/2026)
- **Real-time translation**: Verifies that output updates instantly as the user types
- **Slang and informal language**: Emphasizes expressions and colloquial phrasing
- **Edge cases**: Repeated words, pronoun plurals, technical terms

#### ❌ Negative Functional Tests (Neg_Fun_0001 - Neg_Fun_0011)
These tests validate error handling and edge cases:
- **Misspellings**: Input with common typos and spelling variations
- **Special characters**: Emojis, symbols (@, #) mixed with text
- **Formatting issues**: Multiple consecutive spaces, mixed uppercase/lowercase
- **Complex paragraphs**: Long conversational text with mixed content
- **Unsupported inputs**: Emoji handling and invalid character processing
- **Boundary conditions**: Pronoun perspective changes and partial translations

### Key Test Scenarios

| Test ID | Description | Input Example | Expected Output |
|---------|-------------|----------------|-----------------|
| Pos_Fun_0001 | Short daily phrase | `oyata asanipadha?` | `ඔයට අසනිපද?` |
| Pos_Fun_0004 | Real-time output | `udata yanna.` | `උඩට යන්න.` |
| Pos_Fun_0013 | Mixed English | `Apee team ekata meeting ekak thiyenavaa.` | `අපේ team එකට meeting එකක් තියෙනවා.` |
| Neg_Fun_0002 | Multiple spaces | `m a m a i i y ee...` | `මම ඊයේ ඉදලා කලා නෑ...` |
| Neg_Fun_0007 | Long paragraph | Long conversational text | Full translated paragraph |

## Prerequisites

Before you can run this project, ensure you have the following installed on your system:

### System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)

### Verify Installation
```powershell
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 8.0.0 or higher
```

## Installation & Setup Guide

### Step 1: Clone or Extract the Project
Navigate to your desired workspace directory:
```powershell
cd "C:\Users\User\OneDrive\Desktop\IT 23286900\IT23286900"
```

### Step 2: Install Dependencies
Install all required npm packages:
```powershell
npm install
```

This command will:
- Install Playwright and its browsers (Chromium, Firefox, WebKit)
- Install TypeScript definitions
- Set up the testing environment

**Expected output**:
```
added X packages, and audited Y packages in Z seconds
```

### Step 3: Verify Installation
Check that all dependencies are installed:
```powershell
npm list
```

## Running the Tests

### Run All Tests
Execute the complete test suite:
```powershell
npx playwright test
```

### Run Tests with UI Mode (Recommended for Debugging)
Run tests with an interactive interface:
```powershell
npx playwright test --ui
```

### Run Tests with Headed Browser
Run tests with the browser window visible (instead of headless mode):
```powershell
npx playwright test --headed
```

### Run Specific Test
Execute a single test by name:
```powershell
npx playwright test -g "Pos_Fun_0001"
```

### Run Tests in Debug Mode
Step through tests line by line:
```powershell
npx playwright test --debug
```

### Run Tests for Specific Browser
Test with a particular browser (chromium, firefox, webkit):
```powershell
npx playwright test --project=chromium
```

## Test Reports

### Generate HTML Report
After running tests, an interactive HTML report is automatically generated:
```powershell
npx playwright show-report
```

This opens the HTML report in your default browser showing:
- ✅ Passed tests
- ❌ Failed tests
- Test duration and timing
- Screenshots and videos (if enabled)
- Error messages and stack traces

### Report Location
- **Report Directory**: `./playwright-report/`
- **Main Report File**: `./playwright-report/index.html`
- **Test Results**: `./test-results/`

## Configuration Details

### Playwright Configuration (`playwright.config.js`)

```javascript
{
  testDir: './tests',           // Where tests are located
  fullyParallel: true,          // Run tests in parallel
  forbidOnly: CI-only,          // Prevent test.only in CI
  retries: 2 (CI) / 0 (local),  // Retry failed tests in CI
  reporter: 'html',            // Generate HTML reports
  trace: 'on-first-retry',      // Capture trace on first failure
  projects: ['chromium']        // Browser to test
}
```

### Key Configuration Options
- **`testDir`**: Directory containing test files
- **`fullyParallel`**: Tests run simultaneously for faster execution
- **`reporter`**: Output format (html, json, junit, etc.)
- **`trace`**: Captures browser trace for debugging failed tests

## Test Execution Flow

1. **Navigation**: Each test navigates to https://www.swifttranslator.com/
2. **Input**: Finds the input field and fills it with Singlish text
3. **Translation**: Waits for real-time translation (2.5 seconds)
4. **Output Extraction**: Retrieves the translated Sinhala text
5. **Assertion**: Compares actual output with expected Sinhala script
6. **Logging**: Outputs test ID, input, expected, and actual results

### Helper Function: `translateAndGetOutput(page, input)`
This function encapsulates the translation workflow:
```javascript
// 1. Navigate to Swift Translator
// 2. Wait for page load
// 3. Find and fill input field
// 4. Wait for real-time translation
// 5. Extract translated output
// 6. Return Sinhala text
```

## Troubleshooting

### Issue: Browser Installation Failed
**Solution**: Manually install browsers
```powershell
npx playwright install
```

### Issue: Tests Timeout
**Symptoms**: Tests hang waiting for elements
**Solution**: Increase timeout in playwright.config.js:
```javascript
use: {
  timeout: 10000  // 10 seconds per test
}
```

### Issue: "Element Not Found"
**Causes**: 
- Website layout changed
- Page loading too slowly
- Selector needs updating

**Solutions**:
1. Run with `--headed` flag to see what's happening
2. Increase wait times in the test
3. Check if selectors still match the website

### Issue: Network Errors
**Solution**: Ensure you have internet access to https://www.swifttranslator.com/

## Development Tips

### Enable Video Recording
Uncomment in `playwright.config.js`:
```javascript
use: {
  video: 'retain-on-failure'  // Record only failed tests
}
```

### Add a New Test
1. Open `./tests/example.spec.js`
2. Add a new test case:
```javascript
test('Pos_Fun_0026: Your test description', async ({ page }) => {
  const input = 'your singlish input';
  const expectedOutput = 'expected sinhala output';
  
  const actualOutput = await translateAndGetOutput(page, input);
  
  console.log(`TC ID: Pos_Fun_0026`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);
  
  expect(actualOutput).toBe(expectedOutput);
});
```

### Enable Slow Motion
Slow down test execution to observe behavior:
```powershell
npx playwright test --headed --slow-mo=1000
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @playwright/test | ^1.58.1 | Browser automation and testing framework |
| @types/node | ^25.1.0 | TypeScript type definitions for Node.js |

## NPM Scripts

Currently, no custom scripts are configured. You can add scripts to `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report"
  }
}
```

Then run them with:
```powershell
npm run test
npm run test:headed
```

## Project Metadata

- **Name**: itpm-new
- **Version**: 1.0.0
- **Module Type**: CommonJS
- **License**: ISC

## Environment Variables

Optional environment variables for CI/CD:
- `CI`: Set to `true` in CI environments (enables retries and sequential execution)

## CI/CD Configuration

For continuous integration, the configuration automatically:
- Retries failed tests 2 times
- Runs tests sequentially (not in parallel)
- Generates HTML reports
- Captures traces on first failure

## Documentation Links

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Swift Translator](https://www.swifttranslator.com/)

## Contact & Support

For issues or questions about this test suite:
1. Check the Playwright documentation
2. Review test reports in `./playwright-report/`
3. Enable debug mode to investigate failures

## License

ISC

---

**Last Updated**: January 31, 2026
**Test Suite Version**: 1.0.0
**Total Test Cases**: 36 (25 Positive + 11 Negative)
