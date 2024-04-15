import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//* Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); // limit the amount of data size
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // url encode (e.g google.com/search=jasdjk(+/%)asda)
app.use(express.static("public"));
app.use(cookieParser());

export default app;
