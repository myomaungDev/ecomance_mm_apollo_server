import {config} from 'dotenv'
const {parsed} = config();
export const {
    DB,
    PORT,
    JWT_SECRET
} = parsed;