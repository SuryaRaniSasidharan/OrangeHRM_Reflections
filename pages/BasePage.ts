import { expect, Locator, Page } from '@playwright/test';
import { WaitUtils } from "../utils/WaitUtils/WaitUtils";
import { test } from '../fixtures/testFixtures';

export class BasePage {

    constructor(public page: Page) { }


    /* 
    *Summary:  This method is used to perform click actions with wait.
    * @param locator - locator of the element.
    * Author       : Surya
    */
    async click(locator: Locator): Promise<void> {
        
        await WaitUtils.waitForVisible(locator);
        await locator.click();
    }


    /* 
    *Summary:  This method is used to perform fill actions with wait.
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async fill(locator: Locator, value: string): Promise<void> {

        await WaitUtils.waitForVisible(locator);
        await locator.fill(value);
    }

    /* 
    *Summary:  This method is used to Get text from an element.
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async getText(locator: Locator): Promise<string | null> {

         await WaitUtils.waitForVisible(locator);
        return await locator.textContent();
    }


    
    /* 
    *Summary:  This method is used to verify text attribute of a locator
    * @param locator - locator of the element.
    * @param expectedText - expected text to be verifie.
    * @param message - assertion message.
    * Author       : Surya 
    */
    async verifyText(locator: Locator,expectedText: string, message?: string): Promise<void> {

     await expect(locator,message).toContainText(expectedText);
   }

    /* 
    *Summary:  This method is used to Check whether an element is visible
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async isVisible(locator: Locator): Promise<boolean> {
        
        return await locator.isVisible();
    }

    /* 
    *Summary:  This method is used to Wait for an element to be visible
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async waitForElement(locator: Locator): Promise<void> {

        await locator.waitFor({
            state: "visible"
        });
    }

    /* 
    *Summary:  This method is used to Navigate to URL
    * @param url - url of the page to be navigated.
    * Author       : Surya 
    */
    async navigateTo(url: string): Promise<void> {

        await this.page.goto(url);

    }

    /* 
    *Summary:  This method is used to Scroll to an element
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async scrollIntoView(locator: Locator): Promise<void> {
         await WaitUtils.waitForVisible(locator);
        await locator.scrollIntoViewIfNeeded();

    }

    /* 
    *Summary:  This method is used to Hover over an element
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async hover(locator: Locator): Promise<void> {
         await WaitUtils.waitForVisible(locator);
        await locator.hover();

    }

    /* 
    *Summary:  This method is used to Select dropdown option
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async selectDropdownOption(locator: Locator, value: string): Promise<void> {
         await WaitUtils.waitForVisible(locator);
        await locator.selectOption(value);

    }

    /* 
    *Summary:  This method is used to  Check checkbox
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async check(locator: Locator): Promise<void> {
         await WaitUtils.waitForVisible(locator);
        await locator.check();

    }

    /* 
    *Summary:  This method is used to  UnCheck checkbox
    * @param locator - locator of the element.
    * Author       : Surya 
    */
    async uncheck(locator: Locator): Promise<void> {
         await WaitUtils.waitForVisible(locator);
        await locator.uncheck();

    }
    
    /* 
    *Summary:  This method is used to verify visibility of a locator
    * @param locator - locator of the element.
    * @param errorMessage - error message to verify.
    * Author       : Surya 
    */
    async verifyVisible(locator: Locator, errorMessage: string) {
    await expect(locator, errorMessage).toBeVisible();
    }


    /* 
    *Summary:  This method is used to scroll to top.
    * Author       : Surya 
    */
    async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));

    }

        /* 
    *Summary:  This method is used to scroll to bottom.
    * Author       : Surya 
    */
    async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));


    }

         /* 
    *Summary:  This method is used to verify element is visible and enabled.
    * @param locator - locator of the element.
    * Author       : Surya
    */

    async expectElement(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 50000 });
    await expect(locator).toBeEnabled({ timeout: 50000 });
    }

    
         /* 
    *Summary:  This method is used to scroll to an element.
    * @param locator - locator of the element.
    * Author       : Surya
    */

    async scrollToElement(locator: Locator) {
    await locator.evaluate((el) => {el.scrollIntoView({ block: "center", inline: "nearest"}); });
    }
          /* 
    *Summary:  This method is used to set test timeout.
    * Author       : Surya
    */

    setTestTimeout(timeout: number = 150000) {
    test.setTimeout(timeout);
    }

            /* 
    *Summary:  This method is used to wait for a specific time.
    * @param milliseconds - time in milliseconds to wait.
    * Author       : Surya
    */

    async waitFor(milliseconds: number = 10000) {
    await this.page.waitForTimeout(milliseconds);
    }

    

}