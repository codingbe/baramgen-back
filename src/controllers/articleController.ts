import { Request, Response } from "express";
import { client } from "../server";

const take = 8;

export const createArticle = async (req: Request, res: Response) => {
  const { title, content, category } = req.body;
  try {
    const userInfo = res.locals.userInfo;

    const article = await client.article.create({
      data: {
        title,
        content,
        category,
        user: {
          connect: {
            id: userInfo.id,
          },
        },
      },
    });

    return res.json({ article });
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

    return res.json({ article });
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
  const { id } = req.params;
  try {
    const article = await client.article.findUnique({
      where: { id: Number(id) },
      include: {
        likes: true,
      },
    });
    return res.json({ article });
  } catch {
    return res.json({ article: null });
  }
};

export const readArticles = async (req: Request, res: Response) => {
  const { page, category, sortMethod } = req.body;
  let sort: any = { id: "desc" };

  if (sortMethod === "like") {
    sort = {
      likes: {
        _count: "desc",
      },
    };
  }
  try {
    const articles = await client.article.findMany({
      skip: page,
      take,
      where: {
        category,
      },
      orderBy: sort,
      include: {
        likes: true,
      },
    });
    const count = await client.article.count();
    const lastPage = Math.ceil(count / take);
    return res.json({ articles, lastPage });
  } catch {
    return res.json({ articles: null });
  }
};

export const searchArticle = async (req: Request, res: Response) => {
  let { type, value } = req.query;

  const { page, category } = req.body;
  try {
    let finder: { [key: string]: any } = {};
    if (typeof type === "string") {
      finder[type] = value;
      finder["category"] = category;
    }

    const articles = await client.article.findMany({
      orderBy: {
        id: "desc",
      },
      where: finder,
      skip: page,
      take,
      include: {
        likes: true,
      },
    });
    const count = await client.article.count({
      where: finder,
    });
    const lastPage = Math.ceil(count / take);

    return res.json({ articles, lastPage });
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
