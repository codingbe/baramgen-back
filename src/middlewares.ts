import { Request, Response, NextFunction } from "express";

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  return res.send("Create User!");
};
