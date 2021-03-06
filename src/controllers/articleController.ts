import { Request, Response } from "express";
import { client } from "../server";

const take = 8;

export const createArticle = async (req: Request, res: Response) => {
  const { content, category } = req.body;
  try {
    const userInfo = res.locals.userInfo;

    const article = await client.article.create({
      data: {
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
  } catch (e) {
    console.log(e);
    return res.json({ article: null });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id, content, category } = req.body;
  try {
    const article = await client.article.update({
      where: { id },
      data: {
        content,
        category,
      },
    });

    return res.json({ article });
  } catch (e) {
    console.log(e);
    return res.json({ article: null });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  let { id } = req.body;
  id = Number(id);
  const userInfo = res.locals.userInfo;
  try {
    if (userInfo) {
      //로그인 상태 확인
      if (userInfo?.authority) {
        await client.article.delete({
          where: { id },
        });
      } else {
        const articleInfo = await client.article.findUnique({
          where: { id },
          include: { user: true },
        });
        if (articleInfo?.userId === userInfo.id) {
          await client.article.delete({
            where: { id },
          });
        }
      }
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false });
    }
  } catch (e) {
    console.log(e);
    return res.json({ ok: false });
  }
};

export const readArticles = async (req: Request, res: Response) => {
  const { type, value, page, categoryDivision, sortMethod } = req.query;

  let sort: any = { id: "desc" };
  if (sortMethod === "like") {
    sort = {
      likes: {
        _count: "desc",
      },
    };
  }
  try {
    let finder: { [key: string]: any } = {};

    if (typeof type === "string") {
      finder[type] = { contains: value };
    }
    if (categoryDivision) {
      finder["category"] = categoryDivision;
    }

    const articles = await client.article.findMany({
      orderBy: sort,
      where: finder,
      skip: Number(page) * take,
      take,
      include: {
        likes: true,
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    const count = await client.article.count({
      where: finder,
    });
    const lastPage = Math.ceil(count / take);

    return res.json({ articles, lastPage });
  } catch (e) {
    console.log(e);
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
        const likeInfo = await client.like.deleteMany({ where: { userId: userInfo.id, articleId } });
        return res.json({ like: false, likeInfo });
      } else {
        const likeInfo = await client.like.create({
          data: {
            article: { connect: { id: articleId } },
            user: { connect: { id: userInfo.id } },
          },
        });

        return res.json({ like: true, likeInfo });
      }
    }
  } catch (e) {
    console.log(e);
    return res.json({ like: false, likeInfo: null });
  }
};
