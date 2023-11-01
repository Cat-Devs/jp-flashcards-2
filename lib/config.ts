import dotenv from 'dotenv';
dotenv.config();

export const BUCKET_NAME = process.env.BUCKET_NAME as string;
export const BUCKET_OFFLINE = process.env.BUCKET_OFFLINE as string;
export const TABLE_NAME = process.env.TABLE_NAME as string;
export const TABLE_OFFLINE = process.env.TABLE_OFFLINE as string;
export const AWS_REGION = process.env.AWS_REGION as string;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
export const DEBUG = process.env.DEBUG as string;
