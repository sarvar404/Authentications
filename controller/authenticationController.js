import mongoose from "mongoose";
import { compareAsc, format, parseISO } from "date-fns";
import { setRandomGeneratedKey, setUser } from "../service/auth.js";
import userAuth from "../model/userAuth.js";
import refreshTokenSchema from "../model/refreshTokenSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Check if the email exists in a case-insensitive manner
    const user = await userAuth.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      throw new Error("Invalid user & password");
    }

    // Verify the provided password against the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid user & password");
    }

    let refreshTokenDocument = await refreshTokenSchema.findOne({
      userId: user._id,
    });

    

    if (!refreshTokenDocument) {
      // If a refreshToken document does not exist, generate new token and refreshToken
      const token = setUser(user);
      console.log(token)
      // Save the new refreshToken in the refreshTokenSchema
      refreshTokenDocument = new refreshTokenSchema({
        userId: user._id,
        refreshToken: token,
        token: token,
      });
      await refreshTokenDocument.save();
    }

    // check token expired or not
    // const user123 = jwt.verify(refreshTokenDocument.token, SECRET_KEY, (error, response) => {
    //   console.log(error);
    //   console.log("here---------------------");
    //   console.log(response)
    // });

    // Generate refresh token
    response.cookie("token", refreshTokenDocument.token);
    response.cookie("refreshToken", refreshTokenDocument.refreshToken);
    response.status(200).json({
      success: true,
      message: "You have successfully logged in",
      token: refreshTokenDocument.token,
      refreshToken: refreshTokenDocument.refreshToken,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export const accessTrue = async (request, response) => {
  try {
    response.status(200).json({
      success: true,
      message: "You have access",
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export const refreshToken = async (request, response) => {
  try {
    const { refreshToken } = request.body;

    // Check if the provided refresh token exists in MongoDB
    const refreshTokenDoc = await refreshTokenSchema.findOne({ refreshToken });
    if (!refreshTokenDoc) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = setUser(refreshTokenDoc);

    response.json({
      success: true,
      message: "Token refreshed successfully",
      token: newAccessToken,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};
