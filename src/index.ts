import { env } from "./infra/env/env";
import express  from "express";
import { router } from "./infra/routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(env.PORT, () => {
  console.log("Server is running");
});
