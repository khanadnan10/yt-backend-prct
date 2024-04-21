import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL.replace(
        "<password>",
        process.env.DATABASE_PASSWORD
      )}/${DB_NAME}`
    );
    console.log("MONGODB HOST:", connectionInstance.connection.host);
  } catch (error) {
    console.error("MONGODB ERROR: ", error);
    process.exit(1);
  }
};

export default connectDB;
