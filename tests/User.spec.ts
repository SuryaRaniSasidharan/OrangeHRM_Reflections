import { test, expect } from '../fixtures/testFixtures';
import loginData from '../resources/JSON/loginData.json';
import userData from '../resources/JSON/userData.json';
import { environments } from '../resources/config/environments';

test.describe('User Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(environments.qa.baseURL + environments.qa.loginPath);
  });

  test('Create, validate, update and delete system user', async ({page,loginPage,userPage}) => {

    // Login with valid credentials
    await loginPage.login(loginData.validLogin);
    // Navigate to Add User
    await userPage.navigateToAddUser();
    // Create user using JSON test data
    await userPage.createUser(userData.user);
    // Validate that the user was created successfully
    await userPage.validateUser(userData.user);
    // Edit the created user's username
    await userPage.editUser(userData.user);
    // Validate that the username was updated successfully
    await userPage.validateEditedUser(userData.user)
    // Delete the updated user
    await userPage.deleteUser(userData.user);
    
  });

});