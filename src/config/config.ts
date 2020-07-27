import { config } from 'dotenv';
config();
const port: string = process.env.PORT;
const env: string = process.env.ENV;
const DatabseUrl: string = process.env.DatabseUrl;
const secretKey: string = process.env.SECRECT_KEY;
const configuration = {port, env, DatabseUrl, secretKey};

export default configuration;
