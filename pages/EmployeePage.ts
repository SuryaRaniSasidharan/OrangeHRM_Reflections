import { expect,Page, Locator } from '@playwright/test';
import { EmployeeData } from '../model/testData.types';
import { BasePage } from "./BasePage";
 
export class EmployeePage extends BasePage{
 
readonly pimMenu: Locator;
readonly addEmployeeMenu: Locator;
readonly addEmployeeTitle:Locator
readonly firstNameInput: Locator;
readonly middleNameInput: Locator;
readonly lastNameInput: Locator;
readonly employeeIdInput: Locator;
readonly saveButton: Locator;
readonly successMessage: Locator;
readonly employeeNameInput:Locator;
readonly searchButton:Locator;

readonly otherIDInput:Locator;
readonly employeeListMenu:Locator;
readonly employeeTitle:Locator;
readonly employeeIdSearchInput: Locator;
readonly deleteNotificationText:Locator;
readonly confirmDeleteButton:Locator;
readonly noRecordText:Locator;

constructor(page: Page) {
  super(page);

  this.pimMenu = page.getByText('PIM', { exact: true });
  this.addEmployeeMenu = page.getByText('Add Employee', { exact: true });
  this.addEmployeeTitle = page.getByRole('heading', {name: 'Add Employee'});
  this.firstNameInput = page.getByPlaceholder('First Name');
  this.middleNameInput = page.getByPlaceholder('Middle Name');
  this.lastNameInput = page.getByPlaceholder('Last Name');
  this.employeeIdInput = page.locator('input.oxd-input').nth(4);
  this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
  this.successMessage = page.getByText('Successfully Saved', { exact: false });
  this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
  this.searchButton = page.locator("//button[@type='submit']");
  this.otherIDInput=page.locator("//label[normalize-space()='Other Id']/parent::div/following-sibling::div//input");
  this.employeeListMenu = page.getByRole('link', { name: 'Employee List' });
  this.employeeTitle = page.locator("//h6[@class='oxd-text oxd-text--h6 --strong']");
  this.employeeIdSearchInput=page.locator("//label[normalize-space()='Employee Id']/parent::div/following-sibling::div//input");
  this.deleteNotificationText=page.locator("//p[@class='oxd-text oxd-text--p oxd-text--card-body']"); 
  this.confirmDeleteButton=page.locator("//button[text()=' Yes, Delete ']");
  this.noRecordText=page.locator("//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']//span");

}
 
 
    /* 
* Summary: * This method is navigates to the Add Employee page.
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async navigateToAddEmployee() {
        await this.expectElement(this.pimMenu);
        await this.pimMenu.click();
        await this.expectElement(this.addEmployeeMenu);
        await this.addEmployeeMenu.click();
        await this.expectElement(this.addEmployeeTitle);
        await expect(this.addEmployeeTitle).toBeVisible();

    }
      /* 
* Summary: *  This method is used to create a new employee
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async enterEmployeeDetails(employeeData:EmployeeData) {
        await this.firstNameInput.fill(employeeData.firstName);
        await expect(this.firstNameInput,'First Name value not accepted or displayed').toHaveValue(employeeData.firstName);
        await this.middleNameInput.fill(employeeData.middleName);
        await expect(this.middleNameInput,'Middle Name value not accepted or displayed').toHaveValue(employeeData.middleName);
        await this.lastNameInput.fill(employeeData.lastName);
        await expect(this.lastNameInput,'Last Name value not accepted or displayed').toHaveValue(employeeData.lastName);
        await this.employeeIdInput.fill(employeeData.employeeId);
        await expect(this.employeeIdInput,'Employee ID value not accepted or displayed').toHaveValue(employeeData.employeeId);
    }
        /* 
* Summary: * This method is used to save the employee details after entering the details
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async saveEmployee() {
        await this.expectElement(this.saveButton);
        await this.saveButton.click();
        await expect(this.page,'Employee was not navigated to Personal Details after save').toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/, {timeout: 20000});   

    }
    /* 
* Summary: * This method is used to validate that the employee was created successfully
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async validateEmployeeCreated(employeeData: EmployeeData): Promise<void> {
        await this.expectElement(this.employeeListMenu);
        await this.employeeListMenu.click();
        await this.expectElement(this.employeeNameInput);
        await this.employeeNameInput.fill(employeeData.firstName);
        await this.searchButton.click();
        const employeeRow = this.page.locator('.oxd-table-row').filter({ hasText: employeeData.employeeId });
        await expect(employeeRow,'Created employee was not displayed in the Employee List').toBeVisible({ timeout: 20000 });
        await expect(employeeRow,'Employee ID is not displayed correctly').toContainText(employeeData.employeeId);
        await expect(employeeRow,'Employee first and middle name are not displayed correctly').toContainText(`${employeeData.firstName} ${employeeData.middleName}`);
        await expect(employeeRow,'Employee last name is not displayed correctly').toContainText(employeeData.lastName);
    }

    /* 
* Summary: * This method is used to edit an existing employee's details
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async editEmployeeDetails(employeeData:EmployeeData) {
        const userRow = this.page.locator('.oxd-table-row').filter({ hasText: employeeData.employeeId });
        await expect(userRow,'Employee row was not found for editing').toBeVisible({ timeout: 20000 });
        const editButton = userRow.locator("button:has(i.oxd-icon.bi-pencil-fill)");
        await expect(editButton,'Edit button was not displayed for the employee').toBeVisible({ timeout: 10000 })
        await editButton.click();
         await expect(this.firstNameInput,'Employee edit form was not loaded').toBeVisible({ timeout: 20000 });
        await this.firstNameInput.fill(employeeData.updatedFirstName);
        await expect(this.firstNameInput,'Updated First Name value not accepted or displayed').toHaveValue(employeeData.updatedFirstName);
        await this.middleNameInput.fill(employeeData.updatedMiddleName);
        await expect(this.middleNameInput,'Updated Middle Name value not accepted or displayed').toHaveValue(employeeData.updatedMiddleName);
        await this.lastNameInput.fill(employeeData.updatedLastName);
        await expect(this.lastNameInput,'Updated Last Name value not accepted or displayed').toHaveValue(employeeData.updatedLastName);

    }
        /* 
* Summary: * This method is used to validate that the employee details were updated successfully
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async validateEmployeeEdited(employeeData: EmployeeData): Promise<void> {
        await this.setTestTimeout();
        await this.expectElement(this.employeeListMenu);
        await this.employeeListMenu.click();
        await this.expectElement(this.employeeIdSearchInput);
        await this.employeeIdSearchInput.fill(employeeData.employeeId);
        await this.searchButton.click();
        const employeeRow = this.page.locator('.oxd-table-row').filter({ hasText: employeeData.employeeId });
        await expect(employeeRow,'Updated employee was not displayed in the Employee List').toBeVisible({ timeout: 20000 });
        await expect(employeeRow,'Employee ID is not displayed correctly after update').toContainText(employeeData.employeeId);
    }
    /* 
* Summary: * This method is used to delete an existing employee
 * @param data - EmployeeData object containing the employee details.
* Author       : Surya
*/
    async deleteEmployee(employeeData: EmployeeData): Promise<void> {
        const userRow = this.page.locator('.oxd-table-row').filter({ hasText: employeeData.employeeId });
        await expect(userRow,'Employee row was not found for deletion').toBeVisible({ timeout: 20000 });
        const deleteButton = userRow.locator("i.oxd-icon.bi-trash");
        await expect(deleteButton,'Delete button was not displayed for the employee').toBeVisible({ timeout: 10000 });
        await deleteButton.click();
        await expect(this.deleteNotificationText,'Delete confirmation message should be displayed').toHaveText('The selected record will be permanently deleted. Are you sure you want to continue?');
        await this.expectElement(this.confirmDeleteButton);
        await this.confirmDeleteButton.click();
        await this.noRecordText.waitFor({state: 'visible',timeout: 10000});
    }



}
 