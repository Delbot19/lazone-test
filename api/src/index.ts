import dotenv from "dotenv";
import "reflect-metadata";
import App from "./app";
import validateEnv from "./utils/validateEnv";
import AuthController from "./resources/auth/auth.controller";

dotenv.config();

validateEnv();

const app = new App([new AuthController()], Number(process.env.PORT));
console.log("PORT:", process.env.PORT);
app.listen();
