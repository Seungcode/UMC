import express from "express";
import { addReview } from  "../controllers/review.controller.js";
import expressAsyncHandler from "express-async-handler";

export const storeRouter = express.Router();

storeRouter.post('/new', expressAsyncHandler(addReview));
