import express, { Request, Response, Router } from "express";
import { deleteUser, loginUser, readUser, updateUser } from "../controllers/userController";
import { checkUser } from "../middlewares";

const userRouter: Router = express.Router();

userRouter.post("/", checkUser, loginUser);
userRouter.patch("/", updateUser);
userRouter.delete("/", deleteUser);
userRouter.get("/", readUser);

export default userRouter;
