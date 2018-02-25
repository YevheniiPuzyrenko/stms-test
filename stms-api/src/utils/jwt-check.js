import * as jwt from 'jsonwebtoken';

async function authMiddleware(ctx, next) {
  const token = ctx.request.headers.authorization;

  if (!token) {
    console.log('no token');
    ctx.status = 401;
    ctx.body = 'Auth token is missing!';
    return;
  };
  
  try {
    await jwt.verify(token, 'jellyPanda')
  } catch(e) {
    ctx.body = 'Your token is incorrect or expired. Please sign in.';
    ctx.status = 401;
    return;
  };
  
  return next();
}

export default authMiddleware;