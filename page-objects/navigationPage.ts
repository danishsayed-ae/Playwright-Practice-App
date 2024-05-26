import { Page } from "@playwright/test";

class NavigationPage{
    readonly page : Page
    constructor(page: Page){
        this.page = page
    }

    async formsLayoutPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }
}