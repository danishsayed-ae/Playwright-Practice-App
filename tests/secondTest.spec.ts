import {expect, test} from "@playwright/test"

test.beforeEach('Launching the webpage', async ({page}) => {
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})

test('Locator Methods', async ({page}) => {
    // By Tag Name
    await page.locator('input').first().click()

    // By Id
    await page.locator('#inputEmail1').click()

    // By Class
    page.locator('.shape-rectangle')

    // By Attribute
    page.locator('[placeholder="Email"]')

    // By entire Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // By combining multiple types - chain them without space
    page.locator('input[placeholder="Email"].shape-rectangle')

    // By xpath - not recommended
    page.locator('//*[@id=inputEmail1]')

    // By partial text match
    page.locator(':text("Using")')

    // By exact text
    page.locator(':text-is("Using the Grid")')
})

test('User Facing Locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign In'}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click() //Unique attribute by supported by playwright
    await page.getByTitle('IoT Dashboard').click()
})

test('Child Locators', async ({page}) => {
    // 1st way is by traversing from parent to child just by adding a space between two locators
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    // 2nd way is by chaining locator method
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    // 3rd way is by chaining the locator and user facing locators
    await page.locator('nb-card').getByRole("button", {name: "Sign In"}).first().click()

    // 4th way is by index (NOT RECOMMENDED)
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Parent Locators', async ({page})=>{
    // 1st way by using the keyword "hasText" and then passing the text
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).first().click()

    // 2nd way by using the "has" keyword and then passing the locator
    await page.locator('nb-card', {has: page.locator('[for="inputPassword2"]')}).getByRole('textbox', {name: 'Password'}).click()

    // 3rd way is by using the "filter" and we can use multiple filters in a chain
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign In'}).getByRole('textbox', {name: 'Email'}).first().click()

    // 4th way is by using xpath to traverse from child to parent
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()
})

test('Reusing Locators', async ({page})=>{
    const basicForm = page.locator('nb-card', {hasText: 'Basic Form'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField .fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Test@123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    // Assertion
    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting Values', async ({page})=>{
    const basicForm = page.locator('nb-card', {hasText: 'Basic Form'})
    const buttonText = await basicForm.getByRole('button').textContent() // To extract single text value
    expect(buttonText).toEqual('Submit') //Generic assertion

    const usingTheGrid = page.locator('nb-card', {hasText: 'Using The Grid'})
    const allRadioButtons = await usingTheGrid.locator('nb-radio').allTextContents() // To extract all text values from each and put in array
    expect(allRadioButtons).toContain('Option 1') //Generic assertion

    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue() // To extract text that was inputted
    expect(emailValue).toEqual('test@test.com') //Generic assertion

    const emailPlaceholder = await emailField.getAttribute('placeholder') // To extract value of any attribute
    expect(emailPlaceholder).toEqual('Email') //Generic assertion
})

test('Assertions', async ({page})=>{
    // Generic Assertions - they do not have any wait time 
    const value = 5
    expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card', {hasText: 'Basic Form'}).getByRole('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // Locator Assertions - they have their default wait time that is 5 seconds
    await expect(basicFormButton).toHaveText('Submit5')

    // Soft Assertions
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})