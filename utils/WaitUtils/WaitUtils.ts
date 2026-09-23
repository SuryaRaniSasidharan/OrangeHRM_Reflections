import { Locator, Page } from "@playwright/test";

export class WaitUtils {

    // Wait until element is visible
    static async waitForVisible(locator: Locator, timeout = 30000) {
        await locator.waitFor({
            state: "visible",
            timeout
        });
    }


    // Wait until element is hidden
    static async waitForHidden(locator: Locator, timeout = 30000) {
        await locator.waitFor({
            state: "hidden",
            timeout
        });
    }


    // Wait until element is attached to DOM
    static async waitForAttached(locator: Locator, timeout = 30000) {
        await locator.waitFor({
            state: "attached",
            timeout
        });
    }


    // Wait for page load
    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState("domcontentloaded");
    }


    // Wait for network idle
    static async waitForNetworkIdle(page: Page) {
        await page.waitForLoadState("networkidle");
    }


    // Wait for URL contains text
    static async waitForURL(page: Page, url: string) {
        await page.waitForURL(url);
    }


    // Static wait (use rarely)
    static async sleep(milliseconds: number) {
        await new Promise(resolve =>
            setTimeout(resolve, milliseconds)
        );
    }
}