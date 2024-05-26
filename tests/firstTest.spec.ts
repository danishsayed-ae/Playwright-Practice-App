import {test} from "@playwright/test"

test.beforeEach('Launching the webpage', async ({page}) => {
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
})

test.describe.only("Suite 1", () => {
    test.beforeEach('Launching the webpage', async ({page}) => {
        await page.goto("http://localhost:4200/")
    })
    test("Navigate to forms page", async ({page}) => { 
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
    })
    test('Navigate to charts page', async ({page}) => {
        await page.getByText("Charts").click()
        await page.getByText("Echarts").click()
    })
})

test.describe("Suite 2", () => {
    test.beforeEach('Launching the webpage', async ({page}) => {
        await page.goto("http://localhost:4200/")
    })
    test("Navigate to forms page1", async ({page}) => { 
        await page.getByText("Forms").click()
        await page.getByText("Form Layouts").click()
    })
    test('Navigate to charts page1', async ({page}) => {
        await page.getByText("Charts").click()
        await page.getByText("Echarts").click()
    })
})