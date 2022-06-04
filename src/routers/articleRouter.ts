import express, { Router } from "express";
import {
  createArticle,
  deleteArticle,
  // likeArticle,
  readArticle,
  readArticles,
  searchArticle,
  updateArticle,
} from "../controllers/articleController";

const articleRouter: Router = express.Router();

articleRouter.post("/", createArticle);
articleRouter.patch("/", updateArticle);
articleRouter.delete("/", deleteArticle);
articleRouter.get("/search", searchArticle);
articleRouter.get("/:id", readArticle);
articleRouter.get("/", readArticles);
// articleRouter.patch("/like", likeArticle);

export default articleRouter;
