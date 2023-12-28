import express from "express";
import { addStore } from  "../controllers/store.controller.js";
import expressAsyncHandler from "express-async-handler";

export const storeRouter = express.Router();

storeRouter.post('/new', expressAsyncHandler(addStore));
