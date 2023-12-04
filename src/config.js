import dotenv from "dotenv";

dotenv.config();


export default{
    port :process.env.PORT,
    persistencia: process.env.PERSISTENCIA,
    mongo_uri: process.env.MONGO_URI,
    enviroment:process.env.ENVIROMENT,
    sessionSecret: process.env.SESSION_SECRET,
};


