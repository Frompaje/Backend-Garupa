import { env } from "./config/env";
import express from "express";

const app = express();

app.use(express.json());

app.listen(env.PORT, () => {
  console.log("Server is running");
});
