import { Request, Response } from "express";

export const createComment = (req: Request, res: Response) => {
  return res.send("Create Comment!");
};

export const updateComment = (req: Request, res: Response) => {
  return res.send("Update Comment!");
};

export const deleteComment = (req: Request, res: Response) => {
  return res.send("Delete Comment!");
};
