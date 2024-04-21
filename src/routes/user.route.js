import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRoute.post("/login", loginUser);
// secure routes
userRoute.post("/logout", authMiddleware, logoutUser);
userRoute.post("/refresh-token", refreshAccessToken);

export default userRoute;
