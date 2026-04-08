import { asyncHandler } from '../../../utils/asyncHandler.js';
import { User } from '../../../DB/models/user/user.model.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import Randomstring from 'randomstring';
import { Token } from '../../../DB/models/Token/Token.model.js';
export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //   check if user already exists
  const user = await User.findOne({ email });
  if (user) return next(new Error('User already exists', { cause: 400 }));
  //   hash password
  const hashPasssword = bcrypt.hashSync(password, 8);
  //   create Token
  const token = jwt.sign({ email, name }, process.env.JWT_SECRET);
  // sende email to user
  const sendEmailinfo = await sendEmail({
    to: email,
    subject: 'Welcome to our app',
    text: `Hello ${name}, welcome to our app!`,
    html: `<a href="http://localhost:3000/user/activate_acount/${token}">Activite your Account</a>`,
  });
  if (!sendEmailinfo)
    return next(new Error('Failed to send email', { cause: 500 }));
  //   save user to database
  const newUser = await User.create({ name, email, password: hashPasssword });
  if (!newUser) return next(new Error('Failed to create user', { cause: 500 }));

  return res.status(201).json({
    success: true,
    message: 'User created successfully',
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //  check if user exists
  const user = await User.findOne({ email });
  if (!user)
    return next(new Error('Invalid email or password', { cause: 400 }));
  // check if user is activated
  if (!user.isConformed)
    return next(new Error('Please activate your account', { cause: 400 }));
  // check if password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid)
    return next(new Error('Invalid email or password', { cause: 400 }));
  // create token
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
  await Token.create({
    token,
    user: user.id,
    agent: req.headers['user-agent'],
    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
});

export const activateAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new Error('Invalid token', { cause: 400 }));
  // check if user exists
  const user = await User.findOne({ email: decoded.email });
  if (!user) return next(new Error('User not found', { cause: 404 }));
  // activate user account
  user.isConformed = true;
  await user.save();
  return res.status(200).json({
    success: true,
    message: 'Account activated successfully',
  });
});

export const sendCode = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new Error('User not found', { cause: 404 }));
  const code = Randomstring.generate({ length: 6, charset: 'numeric' });

  user.forgetCode = code;
  await user.save();
  const sendEmailinfo = await sendEmail({
    to: user.email,
    subject: 'Reset Password Code',
    text: `Your reset password code is ${code}`,
    html: `<p>Your reset password code is <b>${code}</b></p>`,
  });
  if (!sendEmailinfo)
    return next(new Error('Failed to send email', { cause: 500 }));

  return res.status(200).json({
    success: true,
    message: 'Reset password code sent successfully',
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new Error('User not found', { cause: 404 }));

  if (user.forgetCode !== req.body.code)
    return next(new Error('Invalid reset password code', { cause: 400 }));

  user.password = bcrypt.hashSync(req.body.newPassword, process.env.SALT_ROUNDS);
  user.forgetCode = null;
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Password reset successfully',
  });
});
