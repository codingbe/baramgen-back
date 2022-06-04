import { Request, Response } from "express";
import FuzzySearch from "fuzzy-search";
import { client } from "../server";

export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const userInfo = res.locals.userInfo;

    const article = await client.article.create({
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

    return res.json(article);
  } catch {
    return res.json({ article: null });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id, title, content } = req.body;
  try {
    const article = await client.article.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return res.json(article);
  } catch {
    return res.json({ article: null });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await client.article.delete({
      where: { id },
    });

    return res.json({ ok: true });
  } catch {
    return res.json({ ok: false });
  }
};

export const readArticle = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const article = await client.article.findUnique({
      where: { id },
    });
    return res.json(article);
  } catch {
    return res.json({ article: null });
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
    return res.json({ articles: result });
  } catch {
    return res.json({ articles: null });
  }
};

export const likeArticle = async (req: Request, res: Response) => {
  const { articleId } = req.body;
  try {
    let userInfo = res.locals.userInfo;

    if (userInfo) {
      const liked = await client.like.findMany({
        where: { userId: userInfo.id, articleId },
      });

      if (liked.length) {
        await client.like.deleteMany({ where: { userId: userInfo.id, articleId } });

        return res.json({ like: true });
      } else {
        await client.like.create({
          data: {
            article: { connect: { id: articleId } },
            user: { connect: { id: userInfo.id } },
          },
        });

        return res.json({ like: true });
      }
    }
  } catch {
    return res.json({ like: false });
  }
};
