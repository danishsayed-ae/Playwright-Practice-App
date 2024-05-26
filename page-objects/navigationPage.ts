import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    constructor(page: Page){
        super(page) // Using the "page" fixture from parent class that is HelperBase
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms') //Using the helper method that we created to check if the menu is expanded
        await this.page.getByText('Form Layout').click()
        await this.waitForNumberOfSeconds(2) //Call the methods from parent class without using the page fixture because we are inheriting
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms') //Using the helper method that we created to check if the menu is expanded
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }

    // Creating a helper method to check if the menu is expanded
    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false") {
            await groupMenuItem.click()
        }
    }

}