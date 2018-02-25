import Router from 'koa-router';

import User from '../models/user';
import authMiddleware from '../utils/jwt-check.js';

const userRouter = new Router();
const userGetFields = 'username nameCoords imageCoords';

userRouter.delete('/users', authMiddleware, async ctx => {
  await User.remove();
  ctx.body = 'Success';
});

userRouter.get('/users', authMiddleware, async ctx => {
  ctx.body = await User.find({});
});

userRouter.get('/user/:username', authMiddleware, async ctx => {
  try {
    ctx.body = await User.find({username: ctx.params.username}, userGetFields);
  } catch(e) {
    ctx.status = 404;
    ctx.body = 'Not found';
  }
});

userRouter.post('/user', async (ctx, next) => {  
  try {
    let newUser = new User({ ...ctx.request.body });
    
    await newUser.save();

    ctx.status = 201;
    ctx.body = newUser;
  } catch (e) {
    const eJson = e.toJSON();

    if(eJson.code === 11000) {
      ctx.status = 400;
      ctx.body = 'This user already exists';
    };
    
    if( eJson.errors ) {
      ctx.status = 400;
      ctx.body = `Fields ${ Object.keys(eJson.errors).join(', ') } are required`;
    };
  }
});

userRouter.put('/user/:username/coords', authMiddleware, async ctx => {
  const { username } = ctx.params.username;
  let { nameCoords, imageCoords } = ctx.request.body;
  
  if ( !imageCoords || !nameCoords ) {
    ctx.status = 400;
    ctx.body = 'Please provide both image and name coordinates';
    return;
  };
  
  try {
    imageCoords = JSON.parse(imageCoords);
    nameCoords = JSON.parse(nameCoords);
  } catch(e) {
    ctx.status = 400;
    ctx.body = 'Please provide valid both image and name coordinates';
    return;
  };
  
  try {
    const some = await User.findOne({ username: 'val2354111' });
    await some.update({
      nameCoords,
      imageCoords
    });
  } catch(e) {
    ctx.body = 'Bad request';
    ctx.status = 400;
    return;    
  };
  
  ctx.body = 'User successfully updated!';
});

export default userRouter;