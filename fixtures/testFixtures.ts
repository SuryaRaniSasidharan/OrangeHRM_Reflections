import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserPage } from '../pages/UserPage';
import { EmployeePage } from '../pages/EmployeePage';

type Fixtures = {
  loginPage: LoginPage;
  userPage:UserPage;
  employeePage:EmployeePage;
};

export const test = base.extend<Fixtures>({
  loginPage: async({page}, use) => {
    await use(new LoginPage(page));

  },
  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
 },

  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
 },
});

export { expect };