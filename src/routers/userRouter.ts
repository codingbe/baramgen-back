import { getPrismaClient } from "@prisma/client/runtime";
import express, { Request, Response, Router } from "express";
import { deleteUser, loginUser, readUser, updateUser } from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.post("/", loginUser);
userRouter.patch("/", updateUser);
userRouter.delete("/", deleteUser);
userRouter.get("/", readUser);

export default userRouter;
