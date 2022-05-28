import { Request, Response } from "express";
import { client } from "../server";

export const createComment = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const { articleId, content } = req.body;
  const comment = await client.comment.create({
    data: {
      user: {
        connect: {
          id: userInfo.id,
        },
      },
      article: {
        connect: {
          id: articleId,
        },
      },
      content,
    },
  });

  return res.json({ comment });
};

export const updateComment = async (req: Request, res: Response) => {
  return res.json("Update Comment!");
};

export const deleteComment = async (req: Request, res: Response) => {
  return res.json("Delete Comment!");
};
