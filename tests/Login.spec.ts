import { test, expect } from '../fixtures/testFixtures';
import loginData from '../resources/JSON/loginData.json';
import { environments } from '../resources/config/environments';

test.describe('OrangeHRM Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(
      environments.qa.baseURL + environments.qa.loginPath);
  });

  test('Valid login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(loginData.validLogin);
    await expect(page).toHaveURL(environments.qa.baseURL + environments.qa.dashboardPath);
  });

  test('Invalid login with invalid credentials', async ({ loginPage, page }) => {
    await loginPage.login(loginData.invalidLogin);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

});