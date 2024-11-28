import { AppDataSource } from "./ormconfig";

const dbConnect = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connection to the database established.");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

export default dbConnect;
