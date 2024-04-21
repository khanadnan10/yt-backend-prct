import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authMiddleware = asyncHandler(async (req, _, next) => {
  // fetch token from cookies or headers
  // verify token from jwt

  try {
    const accessToken =
      req.cookie?.accessToken || req.header("Authorization").split(" ")[1];

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized request!");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid accessToken!");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid accessToken.");
  }
});

export { authMiddleware };
