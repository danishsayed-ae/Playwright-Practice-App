import {test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';

test.beforeEach('Navigating to the web page', async ({page}) => {
    await page.goto('http://localhost:4200/')
});

test('Navigate to Forms page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
});

test('Parameterised Method', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormUsingCredentialsAndSelectOption('test@test.com', 'Test@1234', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormUsingCredentialsAndCheckbox('Danish Sayed', 'ds@test.com', false)
});