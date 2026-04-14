import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { User } from '../../DB/model/user.model.js';
import { Token } from '../../DB/model/token.model.js';
export const authentication = asyncHandler(async (req, res, next) => {
  // get token from header
  const { token } = req.header;
  const berarToken = process.env.BERAR_TOKEN + token;
  // check token format
  if (!berarToken.startsWith('___berar___'))
    return next(new Error('invalid token'));

  // check token
  if (!token) return next(new Error('you must login first'));
  // check token in db
  const tokenDB = await Token.findOne({ token, isValid: true });
  if (!tokenDB) return next(new Error('invalid token'));
  // verify token
  const pyload = jwt.verify(token, process.env.SECRET_KEY);
  // check token validity
  if (!pyload) return next(new Error('invalid token'));

  // check user existence
  const user = await User.findById(pyload.id);
  if (!user) return next(new Error('User not found!'));

  // attach pyload to req عشان اقدر استخدمه فى ال controller
  req.pyload = pyload;
  return next();
});
