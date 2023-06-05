import dotenv from "dotenv";
dotenv.config()
const config = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbUrl: process.env.DB_URL,
    sessionSecret: process.env.SESSION_SECRET,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL
}

export default config