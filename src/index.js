import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 8000;

// Init Database and Server

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server starting on port:", port);
    });
    app.on("error", (e) => {
      console.log(`SERVER ERROR: ${e}`);
    });
  })
  .catch((err) => {
    console.error("DB CONNNECTION ERROR: ", err);
  });
