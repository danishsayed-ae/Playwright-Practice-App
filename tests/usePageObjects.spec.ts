import { test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'

test.beforeEach('Navigating to the web page', async ({ page }) => {
    await page.goto('/')
});

test('Navigate to Forms page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
});

test('Parameterised Method', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormUsingCredentialsAndSelectOption('test@test.com', 'Test@1234', 'Option 1')
    // Use this method to capture a screenshot of the full page and save it in the specific path
    await page.screenshot({ path: 'screenshots/usingTheGrid.png' })
    await pm.onFormLayoutsPage().submitInlineFormUsingCredentialsAndCheckbox(randomFullName, randomEmail, false)
    // Use the screenshot method after specifying a locator to capture only the specific element
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineForm.png' })
});

test.only('Testing with Argos CI for capturing screenshots', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
});