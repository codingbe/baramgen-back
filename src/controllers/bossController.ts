import { Request, Response } from "express";
import { client } from "../server";
import { createTypeList } from "../utils";

export async function getBossList(req: Request, res: Response) {
  const { type, value } = req.query;
  let bosses;

  if (type === "map") {
    bosses = await client.boss.findMany({ where: { map: value as string } });
  } else if (type === "item") {
    bosses = await client.boss.findMany({ where: { item: value as string } });
  } else if (type === "name") {
    bosses = await client.boss.findMany({ where: { name: value as string } });
  }

  return res.json({ bosses });
}

export async function getTypeList(req: Request, res: Response) {
  const boss = await client.boss.findMany();
  return res.json(createTypeList(boss));
}
