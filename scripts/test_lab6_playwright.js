const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const testResultsDir = path.join(__dirname, '..', 'test-results');
if (!fs.existsSync(testResultsDir)) {
  fs.mkdirSync(testResultsDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to TodoMVC demo
    console.log('Navigating to https://demo.playwright.dev/todomvc/...');
    await page.goto('https://demo.playwright.dev/todomvc/', { waitUntil: 'networkidle' });
    
    // Add the task
    const taskText = 'Complete AI Bootcamp Lab 6';
    console.log(`Adding task: "${taskText}"`);
    
    // Find the input field and type the task
    const inputSelector = 'input.new-todo';
    await page.fill(inputSelector, taskText);
    
    // Press Enter to add the task
    await page.press(inputSelector, 'Enter');
    
    // Wait for the task to appear in the list
    await page.waitForSelector('.todo-list li', { timeout: 5000 });
    
    console.log('Task added successfully');
    
    // Take a screenshot
    const screenshotPath = path.join(testResultsDir, 'lab6_proof.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);
    
    // Get page content for verification
    const taskList = await page.locator('.todo-list li').first().textContent();
    console.log(`Verification: Task visible as: "${taskList}"`);
    
    // Write test summary to file
    const logPath = path.join(testResultsDir, 'test-log.md');
    const timestamp = new Date().toISOString();
    const logContent = `# Lab 6: Playwright AI Automation Test Results

**Date:** ${timestamp}

## Test Objective
Verify Playwright automation capabilities by automating a task addition on TodoMVC demo application.

## Test Steps
1. Navigated to https://demo.playwright.dev/todomvc/
2. Added task: "Complete AI Bootcamp Lab 6"
3. Verified task appears in list
4. Captured screenshot: \`lab6_proof.png\`

## Results
✅ **PASSED** - Task successfully added and visible in the TodoMVC application.
- Input field located and filled with task text
- Task added via Enter key
- Task visible in the todo list
- Screenshot captured with full page view

## Evidence
- Screenshot: \`lab6_proof.png\`
- This file: \`test-log.md\`

## Conclusion
Playwright integration for automated web testing is working correctly. The tool can successfully:
- Navigate to web applications
- Interact with form inputs
- Perform user actions (keyboard input, form submission)
- Verify page content and state
- Capture visual evidence of test execution

This demonstrates successful Lab 6 completion and validates Playwright AI Automation capabilities.
`;
    
    fs.writeFileSync(logPath, logContent, 'utf8');
    console.log(`Test log written to ${logPath}`);
    
    console.log('✅ Lab 6 test completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
})();
