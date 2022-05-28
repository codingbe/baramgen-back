import express, { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/commentController";

const commentRouter: Router = express.Router();

commentRouter.post("/", createComment);
commentRouter.patch("/", updateComment);
commentRouter.delete("/", deleteComment);

export default commentRouter;
