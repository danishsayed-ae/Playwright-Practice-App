import { Page } from "@playwright/test";

class NavigationPage{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage(){
        await this.page.getByText('Forms').click()
    }
}