import { Request, Response } from "express";
import { client } from "../server";

export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const userInfo = res.locals.userInfo;

  const createdArticle = await client.article.create({
    data: {
      title,
      content,
      user: {
        connect: {
          id: userInfo.id,
        },
      },
    },
  });

  return res.json({ createdArticle });
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id, title, content } = req.body;

  const updatedArticle = await client.article.update({
    where: { id },
    data: {
      title,
      content,
    },
  });

  return res.json({ updatedArticle });
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.body;

  const deletedArticle = await client.article.delete({
    where: { id },
  });

  return res.json({ deletedArticle });
};

export const readArticle = async (req: Request, res: Response) => {
  const { id } = req.body;
  const findedArticle = await client.article.findUnique({
    where: { id },
  });
  return res.json({ findedArticle });
};

export const searchArticle = async (req: Request, res: Response) => {
  return res.json("Search Article!");
};
