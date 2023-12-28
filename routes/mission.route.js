import express from "express";
import { startMission } from  "../controllers/mission.controller.js";
import expressAsyncHandler from "express-async-handler";

export const missionRouter = express.Router();

missionRouter.post('/start', expressAsyncHandler(startMission));
