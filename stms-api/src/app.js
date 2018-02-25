import Koa from 'koa';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

import userRouter from './controllers/user';
import authRouter from './controllers/auth';

mongoose.connect('mongodb://localhost:27017/stms');

const app = new Koa();

app.use(bodyParser());

app.use(userRouter.routes());
app.use(authRouter.routes());

export default app;