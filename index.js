// index.js

import express from 'express';
import { userRouter } from './routes/user.route.js';
import { tempRouter } from './routes/temp.route.js';
import { specs } from './swagger/swagger.config.js';
import { storeRouter } from './routes/store.route.js';
import {reviewRouter} from './routes/review.route.js';
import SwaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));
app.use('/user', userRouter);
// router setting
app.use('/temp', tempRouter);
app.use('/store', storeRouter);
app.use('/review', reviewRouter);

app.use((req, res, next) => {
    const err = new BaseError(res.statusCode.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.log(err.data);
    res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});
