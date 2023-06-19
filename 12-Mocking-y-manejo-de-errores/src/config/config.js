import dotenv from "dotenv";
import { program } from "commander";


program
    .option(
        "-per, --persistence <type>", "Tipo de persistencia: MONGO o MEMORY", "MONGO"
    )
    .parse();
  

program.parse()
const { persistence } = program.opts();
dotenv.config()
const config = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbUrl: process.env.DB_URL,
    sessionSecret: process.env.SESSION_SECRET,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    persistence:  process.argv[2]?.toUpperCase() || persistence,
    service: process.env.SERVICE,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
}

export default config