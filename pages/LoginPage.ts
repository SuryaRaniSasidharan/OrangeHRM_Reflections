import { Page, Locator } from '@playwright/test';
import { LoginData } from '../model/testData.types';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
 
  

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  
    
  }

      /* 
* Summary: * This method is used to perform login action on the login page.
 * @param data - LoginData object containing the username and password.
* Author       : Surya
*/

  async login(loginData: LoginData): Promise<void> {
    await this.usernameInput.fill(loginData.username);
    await this.passwordInput.fill(loginData.password);
    await this.loginButton.click();
  }


}