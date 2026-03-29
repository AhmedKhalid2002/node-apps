import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { User } from '../../DB/model/user.model.js';
export const authentication = asyncHandler(async (req, res, next) => {
  // get token from header
  const { token } = req.header;
  const berarToken = '___berar___' + token;
  // check token format
  if (!berarToken.startsWith('___berar___'))
    return next(new Error('invalid token format'));
  // check token
  if (!token) return next(new Error('you must login first'));
  // verify token
  const pyload = jwt.verify(token, 'secretkey');
  // check token validity
  if (!pyload) return next(new Error('invalid token'));

  // check user existence
  const user = await User.findById(pyload.id);
  if (!user) return next(new Error('User not found!'));

  // attach pyload to req عشان اقدر استخدمه فى ال controller
  req.pyload = pyload;
  return next();
});
