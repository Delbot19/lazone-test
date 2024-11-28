import dotenv from "dotenv";
import "reflect-metadata";
import App from "./app";
import validateEnv from "./utils/validateEnv";

dotenv.config();

validateEnv();

const app = new App([], Number(process.env.PORT));
console.log("PORT:", process.env.PORT);
app.listen();
