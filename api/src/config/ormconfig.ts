import { DataSource } from "typeorm";
import { User } from "../entities/users";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;

if (!dbName) {
  throw new Error("La variable d'environnement DB_NAME n'est pas définie !");
}

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: dbName,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
