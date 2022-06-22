import express, { Router } from "express";
import {
  createArticle,
  deleteArticle,
  likeArticle,
  readArticles,
  updateArticle,
} from "../controllers/articleController";

const articleRouter: Router = express.Router();

articleRouter.post("/", createArticle);
articleRouter.patch("/", updateArticle);
articleRouter.delete("/", deleteArticle);
articleRouter.get("/", readArticles);
articleRouter.patch("/like", likeArticle);

export default articleRouter;
