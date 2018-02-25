import Router from 'koa-router';

import User from '../models/user';
import authMiddleware from '../utils/jwt-check.js';

const userRouter = new Router();
const userGetFields = 'username nameCoords imageCoords';

userRouter.delete('/api/users', authMiddleware, async ctx => {
  await User.remove();
  ctx.body = {
    msg: 'Success'
  };
});

userRouter.get('/api/users', authMiddleware, async ctx => {
  ctx.body = await User.find({});
});

userRouter.get('/api/user/:username', authMiddleware, async ctx => {
  try {
    ctx.body = await User.findOne({username: ctx.params.username}, userGetFields);
  } catch(e) {
    ctx.status = 404;
    ctx.body = {
      msg: 'Not found'
    };
  }
});

userRouter.post('/api/user', authMiddleware, async (ctx, next) => {  
  try {
    let newUser = new User({ ...ctx.request.body });
    
    await newUser.save();

    ctx.status = 201;
    ctx.body = newUser;
  } catch (e) {
    const eJson = e.toJSON();

    if(eJson.code === 11000) {
      ctx.status = 400;
      ctx.body = {
        msg: 'This user already exists'
      };
    };
    
    if( eJson.errors ) {
      ctx.status = 400;
      ctx.body = `Fields ${ Object.keys(eJson.errors).join(', ') } are required`;
    };
  }
});

userRouter.put('/api/user/:username/coords', authMiddleware, async ctx => {
  const { username } = ctx.params;
  let { nameCoords, imageCoords } = ctx.request.body;

  if ( !imageCoords || !nameCoords ) {
    ctx.status = 400;
    ctx.body = {
      msg: 'Please provide both image and name coordinates'
    };
    return;
  };
  
  try {
    const some = await User.findOne({ username });
    await some.update({
      nameCoords,
      imageCoords
    });
  } catch(e) {
    ctx.body = {
      msg:'User not found'
    };
    ctx.status = 404;
    return;    
  };
  
  ctx.body = {
    msg: 'User successfully updated!'
  };
});

export default userRouter;