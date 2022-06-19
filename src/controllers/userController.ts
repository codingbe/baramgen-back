import axios from "axios";
import { Request, Response } from "express";
import { client } from "../server";

export const loginUser = async (req: Request, res: Response) => {
  const { code } = req.body;
  try {
    const {
      data: { access_token },
    } = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_PASSWORD}&redirect_uri=http://localhost:3000/signin&grant_type=authorization_code`,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      },
      { withCredentials: true }
    );

    const {
      data: { email, picture: img },
    } = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
      {
        headers: {
          authorization: `token ${access_token}`,
          accept: "application/json",
        },
      }
    );

    let userInfo = await client.user.findUnique({
      where: { email },
    });

    if (!userInfo) {
      const nickname = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5);

      await client.user.create({
        data: { email, nickname, img },
      });
    }

    return res.json({ token: access_token });
  } catch (e) {
    console.log(e);
    return res.json({ token: null });
  }
};

export const readUser = async (req: Request, res: Response) => {
  try {
    return res.json({ userInfo: res.locals.userInfo });
  } catch (e) {
    console.log(e);
    return res.json({ userInfo: null });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await client.user.delete({
      where: { email: res.locals.userInfo.email },
    });

    return res.json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.json({ ok: false });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  try {
    let updatedUser = await client.user.update({
      where: {
        id: res.locals.userInfo.id,
      },
      data: {
        nickname,
      },
    });
    return res.json({ userInfo: updatedUser });
  } catch (e) {
    console.log(e);
    return res.json({ userInfo: null });
  }
};
