import Router from 'koa-router';
import jwt from 'jsonwebtoken';

import encryptPassword from '../utils/encrypt-password';
import User from '../models/user';

const authRouter = new Router();

authRouter.post('/api/login', async ctx => {
  let { username, password } = ctx.request.body;
  const user = await User.findOne({ username });

  if( !user ) {
    ctx.status = 404;
    ctx.body = 'Such user does not exist!';
    return;
  };
  
  if( encryptPassword(password) !== user.password ) {
    ctx.status = 400;
    ctx.body = 'Login/Password doesn\'t match!';
    return;
  };
  
  const token = jwt.sign({ username }, 'jellyPanda', {
    expiresIn: '24h'
  });
  
  ctx.body = {
    token
  };
});

export default authRouter;