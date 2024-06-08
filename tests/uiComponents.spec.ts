import { expect, test } from "@playwright/test"

// This will override the global config and run all the tests in this spec file parallel
test.describe.configure({mode: 'parallel'})


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
});

test.describe.only('Form layouts page', async () => {
    // Override the global retry for a specific test
    test.describe.configure({retries: 2})
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async ({page}, testInfo) => {
        // Can be used to perform certain commands before retry. For eg: DB cleanup
        if (testInfo.retry) {
            // Do something
        }
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 500}) // there will be a 50ms delay between each key press

        // Generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com') // Intentionally failing the assertion to check retries
        
        // Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
    });

    test('Radio Buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })
        // await usingTheGridForm.getByLabel('Option 1').check({force: true}) // Using force to bypass the check because element is visually hidden
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked() // isChecked will return boolean value and store in variable
        // Generic assertion
        expect(radioStatus).toBeTruthy()
        // expect(radioStatus).toBeFalsy() 

        // Locator assertion
        expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked() // toBeChecked method is used for locator assertion

        // Clicking on option2 should unselect the option1
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
    });
});

test.describe('Modal & Overlays page', async () => {
    test('Checkbox', async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        // await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true}) //click will just perform click without checking the current state
        // await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true}) // check will select (regardless of the state)
        // await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true}) // uncheck will unselect (regardless of the state)

        const allCheckbox = page.getByRole('checkbox')
        // allCheckbox has locator of 3 elements but it is not an array where we can loop it therefore we use "all()" method
        for (const checkbox of await allCheckbox.all())
            {
                await checkbox.check({force:true})
                expect(await checkbox.check({force:true})).toBeTruthy
            }
    });
})
