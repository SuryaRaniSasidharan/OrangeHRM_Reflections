import { test } from '../fixtures/testFixtures';
import loginData from '../resources/JSON/loginData.json';
import employeeData from '../resources/JSON/employeeData.json';
import { environments } from '../resources/config/environments';

test.describe('Employee Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(environments.qa.baseURL + environments.qa.loginPath);
  });

  test('Create, validate, update and delete employee',async ({page, loginPage, employeePage }) => {

      // Login with valid credentials
      await loginPage.login(loginData.validLogin);
      // Navigate to Add Employee
      await employeePage.navigateToAddEmployee();
      // Enter employee details using JSON test data
      await employeePage.enterEmployeeDetails(employeeData.employee);
      // Save the employee
      await employeePage.saveEmployee();
      //Validate that the employee was created successfully
      await employeePage.validateEmployeeCreated(employeeData.employee);
      //Update employee details using JSON test data
      await employeePage.editEmployeeDetails(employeeData.employee);
      //Save the updated employee
      await employeePage.saveEmployee();
      //Validate that the employee was updated successfully
      await employeePage.validateEmployeeEdited(employeeData.employee);
      //Delete the employee
      await employeePage.deleteEmployee(employeeData.employee);


    }
  );

});