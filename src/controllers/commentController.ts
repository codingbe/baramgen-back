import { Request, Response } from "express";
import { client } from "../server";

export const createComment = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const { articleId, content } = req.body;
  try {
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
  } catch (e) {
    console.log(e);
    return res.json({ comment: false });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;

  const { commentId, content } = req.body;
  try {
    const comment = await client.comment.updateMany({
      where: {
        userId: userInfo.id,
        id: commentId,
      },
      data: {
        content,
      },
    });

    return res.json({ comment });
  } catch (e) {
    console.log(e);
    return res.json({ comment: false });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;

  const { commentId } = req.body;
  try {
    const comment = await client.comment.deleteMany({
      where: {
        userId: userInfo.id,
        id: commentId,
      },
    });

    return res.json({ comment });
  } catch (e) {
    console.log(e);
    return res.json({ comment: false });
  }
};
