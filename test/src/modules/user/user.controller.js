import { asyncHandler } from '../../../utils/asyncHandler.js';
import { User } from '../../../DB/models/user/user.model.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../../utils/sendEmail.js';
import { Token } from '../../../DB/models/Token/Token.model.js';
import jwt from 'jsonwebtoken';
export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //   check if user already exists
  const user = await User.findOne({ email });
  if (!user) return next(new Error('User already exists', { cause: 400 }));
  //   hash password
  const hashPasssword = bcrypt.hashSync(password, process.env.SALT_ROUNDS);
  //   create Token
  const token = jwt.sign({ email, name }, process.env.JWT_SECRET);
  // sende email to user
  const sendEmailinfo = await sendEmail({
    to: email,
    subject: 'Welcome to our app',
    text: `Hello ${name}, welcome to our app!`,
    html: `<a href="localhost:3000/activate/${token}">active Email</a>`,
  });
  if (!sendEmailinfo)
    return next(new Error('Failed to send email', { cause: 500 }));
  //   save user to database
  const newUser = await User.create({ name, email, password: hashPasssword });
  if(!newUser) return next(new Error('Failed to create user', { cause: 500 }));

  return res.status(201).json({
    success: true,
    message: 'User created successfully',
  });
});
