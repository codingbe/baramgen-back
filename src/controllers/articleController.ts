import { Request, Response } from "express";
import FuzzySearch from "fuzzy-search";
import { client } from "../server";

export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
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
  } catch {
    return res.json({ createdArticle: false });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id, title, content } = req.body;
  try {
    const updatedArticle = await client.article.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return res.json({ updatedArticle });
  } catch {
    return res.json({ updatedArticle: false });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const deletedArticle = await client.article.delete({
      where: { id },
    });

    return res.json({ deletedArticle });
  } catch {
    return res.json({ deletedArticle: false });
  }
};

export const readArticle = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const findedArticle = await client.article.findUnique({
      where: { id },
    });
    return res.json({ findedArticle });
  } catch {
    return res.json({ findedArticle: false });
  }
};

export const searchArticle = async (req: Request, res: Response) => {
  const { type, value } = req.query;
  try {
    const article = await client.article.findMany({
      orderBy: {
        id: "desc",
      },
    });

    const searcher = new FuzzySearch(article, [type as string], {
      caseSensitive: true,
    });

    const result = searcher.search(value as string);

    return res.json({ result });
  } catch {
    return res.json({ result: false });
  }
};
