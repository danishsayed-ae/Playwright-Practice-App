import {test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';

test.beforeEach('Navigating to the web page', async ({page}) => {
    await page.goto('http://localhost:4200/')
});

test('Navigate to Forms page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
});

test('Parameterised Method', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormUsingCredentialsAndSelectOption('test@test.com', 'Test@1234', 'Option 1')
    await onFormLayoutsPage.submitInlineFormUsingCredentialsAndCheckbox('Danish Sayed', 'ds@test.com', false)
});