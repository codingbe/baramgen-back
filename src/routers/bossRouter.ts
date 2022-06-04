import express, { Router } from "express";
import { getBossList, getTypeList } from "../controllers/bossController";

const bossRouter: Router = express.Router();

bossRouter.get("/", getBossList);
bossRouter.get("/type", getTypeList);

export default bossRouter;
