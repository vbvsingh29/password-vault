import "dotenv/config";

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY;
export const PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;
