import { logger } from "./config/logger";
import { env } from "./infra/env/env";
import { router } from "./infra/routes";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(router);

app.listen(env.PORT, () => {
  logger.info("Server is running");
});
