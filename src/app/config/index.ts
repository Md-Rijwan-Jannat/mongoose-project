import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.URL_PORT,
  database_url: process.env.MONGOOSE_URL,
};
