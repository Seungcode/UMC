// temp.route.js

import express from 'express';
import { tempTest } from '../controllers/temp.controllers.js';
import { tempException } from '../controllers/temp.controllers.js';

export const tempRouter = express.Router();

tempRouter.get('/test', tempTest);

// temp.route.js

tempRouter.get('/exception/:flag',tempException);