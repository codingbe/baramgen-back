import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { client } from "./server";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  next();
};
