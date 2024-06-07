import {test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import {fa, faker} from '@faker-js/faker'

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
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormUsingCredentialsAndSelectOption('test@test.com', 'Test@1234', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormUsingCredentialsAndCheckbox(randomFullName, randomEmail, false)
});