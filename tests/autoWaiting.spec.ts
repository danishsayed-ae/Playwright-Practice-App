import {expect, test} from "@playwright/test"
import { timeout } from "rxjs-compat/operator/timeout"

test.beforeEach('Launching the webpage', async ({page}, testInfo) => {
  // This will add extra timeout for this test spec only
  testInfo.setTimeout(testInfo.timeout + 2000)
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto Waiting', async ({page}) => {
  const successButton = await page.locator('.bg-success')
  successButton.click()

  // 1st way - it has auto wait
  const text = await successButton.textContent()
  expect(text).toEqual('Data loaded with AJAX get request.')

  // 2nd way - all text content does not have auto wait - so we can add a condition for waiting
  const text2 = await successButton.allTextContents()
  await successButton.waitFor({state: 'attached'}) // This condition will wait for the state to be attached
  expect(text2).toContain('Data loaded with AJAX get request.')

  // 3rd way locator assertion have default wait of 5seconds we can override timeout
  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('Alternative Waits', async ({page}) => {
  const successButton = await page.locator('.bg-success')

  // 1st way - we can wait for a locator
  await page.waitForSelector('.bg-success')

  // 2nd way - we can also wait for a API response
  await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  // 3rd way - we can wait for all API calls to be completed (NOT RECOMMMENDED)
  await page.waitForLoadState('networkidle')

  // 4th way - timeout (NOT RECOMMMENDED)
  await page.waitForTimeout(18000)

  const text = await successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
});

test.skip('Timeouts', async ({page}) => {
  test.setTimeout(1000) // This will set the timeout only for this test
  test.slow() // This will 3x the default timeout
  const successButton = await page.locator('.bg-success')
  
  // Be default the test timeout is 30 seconds but we can override the timeout as well
  await successButton.click({timeout: 16000}) 
});