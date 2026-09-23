import { APIRequestContext, APIResponse } from '@playwright/test'; 
import { ENV } from '../../globalSetup/env';
 
export class ApiClient {
 
    constructor(
 
        private request: APIRequestContext
 
    ) {}
 
    private getHeaders() {
 
        return {
 
            'Authorization': `Bearer ${ENV.accessToken}`,
 
            'Content-Type': 'application/json',
 
            'Accept': 'application/json'
 
        };
 
    }
 
    async post(
 
        endpoint: string,
 
        data: unknown
 
    ): Promise<APIResponse> {
 
        return await this.request.post(
 
            `${ENV.baseUrl}${endpoint}`,
 
            {
 
                headers: this.getHeaders(),
 
                data: data
 
            }
 
        );
 
    }
 
    async get(
 
        endpoint: string
 
    ): Promise<APIResponse> {
 
        return await this.request.get(
 
            `${ENV.baseUrl}${endpoint}`,
 
            {
 
                headers: this.getHeaders()
 
            }
 
        );
 
    }
 
 
 
 
async delete(
 
    endpoint: string,
 
    data?: unknown
 
): Promise<APIResponse> {
 
    return await this.request.delete(
 
        `${ENV.baseUrl}${endpoint}`,
 
        {
 
            headers: this.getHeaders(),
 
            data: data
 
        }
 
    );
 
}
 
 
 
}
 