import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { client } from "./server";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  try {
    const {
      data: { email },
    } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`, {
      headers: {
        authorization: `token ${token}`,
        accept: "application/json",
      },
    });

    let userInfo = await client.user.findUnique({
      where: { email },
    });

    res.locals.userInfo = userInfo;
    next();
  } catch {
    next();
  }
};
