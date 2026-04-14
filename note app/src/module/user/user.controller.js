import { Token } from '../../../DB/model/token.model.js';
import { User } from '../../../DB/model/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = asyncHandler(async (req, res, next) => {
  // data email password age
  const { email, confirmPassword, password, age } = req.body;
  // check password
  if (password != confirmPassword)
    return next(new Error('Password must match!'));
  // return res.json({
  //   success: true,
  //   message: 'Password must match!',
  // });
  // check email
  const isUser = await User.findOne({ email });
  if (isUser) return next(new Error('Email already existed!'));

  /*
    return res.json({
      success: false,
      message: 'Email already existed!',
    });
  
    */
  //  hash password
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(process.env.SALT_ROUNDS),
  );
  // create user
  await User.create({ password: hashedPassword, age, email });
  // send response
  return res.json({
    success: true,
    messege: 'You can login Now',
  });
});

export const login = asyncHandler(async (req, res, next) => {
  // data
  const { email, password } = req.body;
  // check user
  const user = await User.findOne({ email });
  //   check email
  if (!user) return next(new Error('email is invalid'));
  // return res.json({
  //   success: false,
  //   message: 'email is invalid',
  // });
  // check password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return next(new Error('password is invalid'));

  // generete token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d',
    },
  );
  // save token in db
  await Token.create({
    user: user._id,
    token,
    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    agent: req.headers['user-agent'],
  });
  // send response
  return res.json({
    success: true,
    message: 'User login successfully ',
    token,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const { token } = req.header;
  await Token.findOneAndUpdate({ token, isValid: true }, { isValid: false });
  return res.json({
    success: true,
    message: 'User logout successfully ',
  });
});
