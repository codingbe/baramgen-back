import express, { Router } from "express";
import { fetchExcel, renderHome } from "../controllers/fetchController";

const dataRouter: Router = express.Router();

dataRouter.get("/", renderHome);
dataRouter.post("/", fetchExcel);

export default dataRouter;
