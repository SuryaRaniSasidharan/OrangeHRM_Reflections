import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
 
    testDir: '.',
 
    fullyParallel: true,
 
    forbidOnly: !!process.env.CI,
 
    retries: 1,
 
    workers: process.env.CI ? 1 : undefined,
 
    reporter: [['html', { open: 'never' }]],
 
    use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
 
    projects: [
 
        // UI Tests
        {
            name: 'chromium',
            testMatch: 'tests/**/*.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
 
        // API Tests
        {
            name: 'api',
            testDir: './testcases',
            testMatch: '**/specs/api/**/*.spec.ts',
        },
    ],
});