import { registerController } from "@/http/controllers/user/user-register.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", registerController);

export default userRouter;
