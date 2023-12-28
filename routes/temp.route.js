// temp.route.js

import express from 'express';
import { tempTest } from '../controllers/temp.controllers.js';
import { tempException } from '../controllers/temp.controllers.js';
import  imageUploader  from '../api/imageUploader.js';
import ProfileController from '../controllers/ProfileController.js';

export const tempRouter = express.Router();

tempRouter.post('/honghee/image', imageUploader.single('image'), (req, res) => {res.sendFile('good!')});

tempRouter.get('/test', tempTest);

// temp.route.js

tempRouter.get('/exception/:flag',tempException);