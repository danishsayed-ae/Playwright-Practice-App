import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    // Creating a parameterised method that expects 3 arguments
    async submitUsingTheGridFormUsingCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGrid = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGrid.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGrid.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGrid.getByRole('radio', {name: optionText}).click({force: true})
        await usingTheGrid.getByRole('button').click()
    }

    /**
     * This method will fill the inline form with user details
     * @param name - Should be the first and last name
     * @param email - Should be the email address
     * @param rememberMe - Select if you want your details to be saved
     */
    async submitInlineFormUsingCredentialsAndCheckbox(name: string, email: string, rememberMe: boolean ){
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await inlineForm.getByPlaceholder('Jane Doe').fill(name)
        await inlineForm.getByPlaceholder('Email').fill(email)
        if (rememberMe) {
            await inlineForm.getByLabel('Remember me').check({force: true})    
        }
        await inlineForm.getByRole('button').click()

    }

}
