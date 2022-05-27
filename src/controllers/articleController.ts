import { Request, Response } from "express";

export const createArticle = (req: Request, res: Response) => {
  return res.send("Create Article!");
};

export const updateArticle = (req: Request, res: Response) => {
  return res.send("Update Article!");
};

export const deleteArticle = (req: Request, res: Response) => {
  return res.send("Delete Article!");
};

export const readArticle = (req: Request, res: Response) => {
  return res.send("Read Article!");
};

export const searchArticle = (req: Request, res: Response) => {
  return res.send("Search Article!");
};
