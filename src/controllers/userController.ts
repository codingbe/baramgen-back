import { Request, Response } from "express";

export const loginUser = (req: Request, res: Response) => {
  return res.send("Login User!");
};

export const readUser = (req: Request, res: Response) => {
  return res.send("Get User Info!");
};

export const deleteUser = (req: Request, res: Response) => {
  return res.send("Delete User!");
};

export const updateUser = (req: Request, res: Response) => {
  return res.send("Update User!");
};
