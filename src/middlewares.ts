import { Request, Response, NextFunction } from "express";
import { client } from "./server";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  await client.user.create({ data: { email: "string", nickname: "why" } });
  return res.send("Create User!");
};
