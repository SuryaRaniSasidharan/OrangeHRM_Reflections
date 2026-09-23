import { ApiClient } from '../utils/CommonHandlersAndHelpers/apiClient';
import { CreateUserRequest } from '../model/userRequest';
 
export class UserService {
 
    constructor(
 
        private apiClient: ApiClient
 
    ) {}
 
    async createUser(
 
        userData: CreateUserRequest
 
    ) {
 
        return await this.apiClient.post(
 
            '/api/v2/admin/users',
 
            userData
 
        );
 
    }
 
    async getAllUsers()
     {    
        return await this.apiClient.get(
                     '/api/v2/admin/users'    
                    );
     }
 
async deleteUser(userId: number) {
    return await this.apiClient.delete(
        '/api/v2/admin/users',
        {
            ids: [userId]
        }
    );
}
 
}
 
 
 