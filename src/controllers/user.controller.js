import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  // get body from the user
  // validate body with the schema and required fields
  // check if the avatar is availabel or not
  // encrypt password
  // create user and save to database
  // destruct response from db - remove password and token
  // return response

  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with same email or username already exist!");
  }

  console.log("FILES: ", req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required!");
  }

  //uploading to cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Can't upload avatar at this time!");
  }

  const createdUser = await User.create({
    fullName,
    avatar: avatar.url,
    coverImageLocalPath: coverImage?.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring user!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registration successfull."));
});

export { registerUser };
