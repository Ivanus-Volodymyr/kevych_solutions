import dotenv from "dotenv";

import { IConfigEnv } from "../interfaces";

dotenv.config();

export const configEnv: IConfigEnv = {
  port: process.env.port || 5000,
};
