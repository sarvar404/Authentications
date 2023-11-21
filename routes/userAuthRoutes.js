import express from "express";
import dotenv from "dotenv";
import { accessTrue, login, refreshToken } from "../controller/authenticationController.js";
import { authSecurityHeader, verifyAccessToken } from "../middlewares/middlewareAuth.js";



dotenv.config();
const router = express.Router();

router.post("/login",authSecurityHeader, login);
router.get("/verify",authSecurityHeader, verifyAccessToken, accessTrue);
router.post("/refresh",authSecurityHeader, refreshToken);


export default router;
