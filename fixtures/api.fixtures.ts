import {test as base,expect} from '@playwright/test';
import { UserService } from '../services/userService'; 
import { ApiClient } from '../utils/CommonHandlersAndHelpers/apiClient';
 
type ApiFixtures = { 
    userService: UserService; 
};
 
export const test = base.extend<ApiFixtures>({ 

    userService: async ({ request }, use) => {
 
        const apiClient = new ApiClient(request);
 
        const userService = new UserService(apiClient);
 
        await use(userService);
 
    }
 
});
 
export { expect };
 
 