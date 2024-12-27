import { env } from "../config/env";
import { Pool } from "pg";

export const pg = new Pool({
  host: env.HOSTNAME,
  user: env.PG_USERNAME,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
});
