import apiTestData from '../../../resources/JSON/apiTestData.json';
import { test, expect } from '../../../fixtures/api.fixtures';
 
test.describe.serial('User API Tests', () => {
 
    let createdUserId: number;
 
    test('Create User API', async ({ userService }) => {
 
        const userPayload = {

            ...apiTestData.createUser,

        };
 
        const response = await userService.createUser(

            userPayload

        );
 
        console.log(

            'Status Code:',

            response.status()

        );
 
        const responseBody = await response.json();
 
        console.log(

            'Response:',

            JSON.stringify(responseBody, null, 2)

        );
 
        expect(response.status()).toBe(200);
 
        // Capture created user ID

        createdUserId = responseBody.data.id;
 
        console.log(

            'Created User ID:',

            createdUserId

        );

    });
 
 
    test('Delete Created User', async ({ userService }) => {
 
        // Make sure Create User test was successful

        expect(createdUserId).toBeDefined();
 
        console.log(

            'Deleting User ID:',

            createdUserId

        );
 
        // Delete the created user

        const deleteResponse =

            await userService.deleteUser(createdUserId);
 
        console.log(

            'Delete Status Code:',

            deleteResponse.status()

        );
 
        console.log(

            'Delete Response:',

            await deleteResponse.text()

        );
 
        expect(deleteResponse.status()).toBe(200);
 
    });
 
});
 