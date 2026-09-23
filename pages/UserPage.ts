import { expect,Page, Locator } from '@playwright/test';
import { UserData } from '../model/testData.types';
import { BasePage } from "./BasePage";

export class UserPage extends BasePage{
  
  readonly adminMenu:Locator;
  readonly addUserButton:Locator;
  readonly addUserTitle:Locator;
  readonly ddUserRole: Locator;
  readonly ddAdmin: Locator;
  readonly ddStatus: Locator;
  readonly ddEnabled: Locator;
  readonly employeeNameInput: Locator;
  readonly employeeOptions:Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;
  readonly searchButton: Locator;
  readonly deleteNotificationText:Locator;
  readonly confirmDeleteButton:Locator;
  readonly noRecordText:Locator;
  readonly editUserTitle:Locator;
 
  

  constructor(page: Page) {
    super(page);

    this.adminMenu = page.getByText('Admin', { exact: true });
    this.addUserButton=page.getByRole('button', { name: 'Add' });
    this.addUserTitle=page.getByText('Add User', {exact: true});
    this.ddUserRole = page.locator("//label[text()='User Role']//parent::div//following-sibling::div//i");
    this.ddAdmin=page.locator("//div[@role='option']//span[text()='Admin']");
    this.ddStatus= page.locator("//label[text()='Status']//parent::div//following-sibling::div//i");
    this.ddEnabled= page.locator("//div[@role='option']//span[text()='Enabled']");
    this.employeeNameInput= page.locator("//input[contains(@placeholder,'Type for hints')]");
    this.employeeOptions=page.locator("//div[@role='listbox']//div//span");
    this.userNameInput= page.locator("//label[text()='Username']//parent::div//following-sibling::div//input");
    this.passwordInput = page.locator("//label[text()='Password']//parent::div//following-sibling::div//input");
    this.confirmPasswordInput = page.locator("//label[text()='Confirm Password']//parent::div//following-sibling::div//input");
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save ' });
    this.searchButton = page.locator("//button[@type='submit']");
    this.editUserTitle=page.locator("//h6[@class='oxd-text oxd-text--h6 orangehrm-main-title']");
    this.deleteNotificationText=page.locator("//p[@class='oxd-text oxd-text--p oxd-text--card-body']"); 
    this.confirmDeleteButton=page.locator("//button[text()=' Yes, Delete ']");
    this.noRecordText=page.locator("//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']//span");  


  }

  
//   * Summary: * This method is used for navigating to the Add User page.
// * Author       : Surya
// *
    async navigateToAddUser() {
        await this.expectElement(this.adminMenu);
        await this.adminMenu.click();
        await this.expectElement(this.addUserButton);
        await this.addUserButton.click();
        await expect(this.addUserTitle).toBeVisible();

    }

    /* 
* Summary: * This method is used to create a new user
 * @param data - UserData object containing the user details.
* Author       : Surya
*/

async createUser(userData: UserData): Promise<void> {
  await this.expectElement(this.ddUserRole);
  await this.ddUserRole.click();
  await this.ddAdmin.click();
  await this.ddStatus.click();
  await this.ddEnabled.click();
  await this.employeeNameInput.click();
  await this.employeeNameInput.fill(userData.employeeName);
  await this.employeeOptions.first().waitFor({state: 'visible',timeout: 10000});
  // Select the first employee option
  await this.employeeOptions.first().click();
  // Read the value after selection
  const selectedEmployeeName = await this.employeeNameInput.inputValue();
  console.log('Employee selected:', selectedEmployeeName);
  // Validate the selected employee
  await expect(this.employeeNameInput,'Employee name was not selected from the dropdown').toHaveValue(selectedEmployeeName);
  await this.expectElement(this.userNameInput);
  await this.userNameInput.click();
  await this.userNameInput.fill(userData.username);
  await expect(this.userNameInput,'Username value was not accepted or displayed').toHaveValue(userData.username);
  await this.expectElement(this.passwordInput);
  await this.passwordInput.fill(userData.password);
  await expect(this.passwordInput,'Password value was not accepted or displayed').toHaveValue(userData.password);
  await this.expectElement(this.confirmPasswordInput);
  await this.confirmPasswordInput.fill(userData.password);
  await expect(this.confirmPasswordInput,'Confirm Password value was not accepted or displayed').toHaveValue(userData.password);
  await this.saveButton.click();
  this.setTestTimeout();
  await expect(this.page,'After saving the user, the page should navigate to System Users').toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',{timeout: 50000});
}

    /* 
* Summary: * This method is used to validate userdata
 * @param data - UserData object containing the user details.
* Author       : Surya
*/
async validateUser(userData: UserData): Promise<void> {
  await this.userNameInput.fill(userData.username);
  await this.searchButton.click();
  const usernameRecord = this.page.getByText(userData.username,{ exact: true });
  await expect(usernameRecord,`Username "${userData.username}" was not displayed in the System Users list`).toBeVisible({ timeout: 20000 });
}

    /* 
* Summary: * This method is used to edit the details of an existing use
 * @param data - UserData object containing the user details.
* Author       : Surya
*/
async editUser(userData: UserData): Promise<void> {
  this.setTestTimeout();
  // Search for the existing username
  await this.userNameInput.fill(userData.username);
  await this.searchButton.click();
  // Wait for the searched user to appear
  const usernameRecord = this.page.getByText(userData.username,{ exact: true });
  await usernameRecord.waitFor({state: 'visible',timeout: 10000});
  // Find the row containing the searched username
  const userRow = this.page.locator(`//div[contains(@class,'oxd-table-row')][.//div[text()='${userData.username}']]`);
  await userRow.waitFor({state: 'visible',timeout: 10000});
  // Find Edit button only inside this user's row
  const editButton = userRow.locator("button:has(i.oxd-icon.bi-pencil-fill)");
  await editButton.waitFor({state: 'visible',timeout: 10000});
  await editButton.click();
  // Validate Edit User page
  await expect(this.editUserTitle,'Edit User page title should be displayed').toHaveText('Edit User');
  const selectedEmployeeName =await this.employeeNameInput.inputValue();
  console.log('Existing employee:', selectedEmployeeName);
  await expect(this.employeeNameInput,'Employee Name should be populated on Edit User page').not.toHaveValue('');
  await expect(this.userNameInput,'Username should contain the expected value').toHaveValue(userData.username);
  // Update username
  await this.userNameInput.fill(userData.updatedUsername);
  await expect(this.userNameInput,`Username should be updated to "${userData.updatedUsername}"`).toHaveValue(userData.updatedUsername);
  await this.saveButton.click();
  await expect(this.page,'After updating the user, the page should navigate to System Users').toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',{ timeout: 50000 });
}

    /* 
* Summary: * This method is used to edit the details of an existing use
 * @param data - UserData object containing the user details.
* Author       : Surya
*/
async validateEditedUser(userData: UserData): Promise<void> {
  await this.expectElement(this.userNameInput);
  await this.userNameInput.fill(userData.updatedUsername);
  await expect(this.userNameInput,`Search username should be "${userData.updatedUsername}"`).toHaveValue(userData.updatedUsername);
  await this.searchButton.click();
  await this.setTestTimeout();
  const usernameRecord = this.page.getByText(userData.updatedUsername,{ exact: true });
  await usernameRecord.waitFor({state: 'visible',timeout: 10000});
  await expect(usernameRecord,`Username "${userData.updatedUsername}" was not displayed in the System Users list`).toBeVisible({ timeout: 10000 });
}


    /* 
* Summary: * This method is used to delete an existing user
 * @param data - UserData object containing the user details.
* Author       : Surya
*/

async deleteUser(userData: UserData): Promise<void> {
  // Search for updated username
  await this.userNameInput.fill(userData.updatedUsername);
  await this.searchButton.click();
  // Wait for the user to appear
  const usernameRecord = this.page.getByText(userData.updatedUsername,{ exact: true });
  await usernameRecord.waitFor({state: 'visible',timeout: 10000});
  // Locate the specific user's row
  const userRow = this.page.locator(`//div[contains(@class,'oxd-table-row')][.//div[text()='${userData.updatedUsername}']]`);
  await userRow.waitFor({state: 'visible',timeout: 10000});
  // Locate Delete button inside that row
  const deleteButton = userRow.locator("button:has(i.oxd-icon.bi-trash)");
  await deleteButton.waitFor({state: 'visible',timeout: 10000});
  await deleteButton.click();
  // Delete confirmation
  await expect(this.deleteNotificationText,'Delete confirmation message should be displayed').toHaveText('The selected record will be permanently deleted. Are you sure you want to continue?');
  await this.expectElement(this.confirmDeleteButton);
  await this.confirmDeleteButton.click();
  // Validate deletion
  await this.noRecordText.waitFor({state: 'visible',timeout: 10000});
  await expect(this.noRecordText,`No Records Found message should be displayed after deleting user "${userData.updatedUsername}"`).toBeVisible();
}

}

