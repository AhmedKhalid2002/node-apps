import { asyncHandler } from '../../utils/asyncHandler.js';
import { Token } from '../../DB/model/token.model.js';
import { jwt } from 'jsonwebtoken';
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  //   check if token exists
  if (!token) return next(new Error('Token missing'), { cause: 400 });

  //   check prefix (Bearer)
  if (!token.startsWith(process.env.TOKEN_PREFIX))
    return next(new Error('Invalid token'), { cause: 400 });
  //   remove prefix
  token = token.split(process.env.TOKEN_PREFIX)[1];

  //   check token in db
  const tokenDb = await Token.findOne({ token, isValid: true });
  if (!tokenDb) return next(new Error('Invalid token'), { cause: 400 });

  //   generate payload
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   check User
  const user = await User.findById(payload.id);
  if (!user) return next(new Error('Invalid token'), { cause: 400 });

  req.user = user;
  next();
});
