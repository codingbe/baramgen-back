import axios from "axios";
import { Request, Response } from "express";
import { client } from "../server";

export const loginUser = async (req: Request, res: Response) => {
  const { code } = req.body;

  const {
    data: { access_token },
  } = await axios.post(
    `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_PASSWORD}&redirect_uri=https://localhost:4000&grant_type=authorization_code`,
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    },
    { withCredentials: true }
  );

  const {
    data: { email },
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
      data: { email, nickname },
    });
  }

  return res.json({ token: access_token });
};

export const readUser = async (req: Request, res: Response) => {
  const { token } = req.headers;
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

  return res.json({ userInfo });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { token } = req.headers;
  const {
    data: { email },
  } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`, {
    headers: {
      authorization: `token ${token}`,
      accept: "application/json",
    },
  });

  let deleteUser = await client.user.delete({
    where: { email },
  });

  return res.json({ deleteUser });
};

export const updateUser = (req: Request, res: Response) => {
  return res.json("Update User!");
};

export const likeArticle = async (req: Request, res: Response) => {
  const { token } = req.headers;
  const {
    data: { email },
  } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`, {
    headers: {
      authorization: `token ${token}`,
      accept: "application/json",
    },
  });

  // const liked = await client.like.findMany({
  //   where: { userId, recipeId },
  // });

  // if (liked.length) {
  //   await client.like.deleteMany({ where: { userId, recipeId } });
  // } else {
  //   return client.like.create({
  //     data: {
  //       article: { connect: { id: articleId } },
  //       user: { connect: { id: userId } },
  //     },
  //   });
  // }

  return res.json("Like User!");
};
