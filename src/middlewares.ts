import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { client } from "./server";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
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
    } catch {
      // 토큰 유효기간이 끝났을때
      return res.json({ userInfo: null });
    }
  }
  next();
};
