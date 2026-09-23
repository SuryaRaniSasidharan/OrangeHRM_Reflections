import dotenv from 'dotenv';
import path from 'path';
 
const testEnv = process.env.test_env || 'dev';
const envFile = path.resolve(__dirname, '../resources/test.data.env');
const envDotFile = path.resolve(__dirname, `../resources/.env.${testEnv}`);
 
if (process.env.ORANGEHRM_BASE_URL === undefined && process.env.ORANGEHRM_ACCESS_TOKEN === undefined) {
    dotenv.config({ path: envFile });
}
 
if (!process.env.ORANGEHRM_BASE_URL && !process.env.ORANGEHRM_ACCESS_TOKEN) {
    dotenv.config({ path: envDotFile });
}
 
export const ENV = {
    baseUrl: process.env.ORANGEHRM_BASE_URL || '',
    accessToken: process.env.ORANGEHRM_ACCESS_TOKEN || ''
};
 
 