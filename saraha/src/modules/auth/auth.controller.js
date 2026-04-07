import Joi from 'joi';
import asyncHandler from '../../../utils/asyncHandler.js';
import { User } from '../../../DB/model/user.model.js';
import { sendEmail } from '../../../utils/senEmial.js';
export const signUp = asyncHandler(async (req, res) => {
  //   hash password
  const hashPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS);
  // create user
  const user = await User.create({ ...req.body, password: hashPassword });
  // send confirmation email
  const emailSent = await sendEmail({
    to: user.email,
    subject: 'Confirm your email',
    text: `Please confirm your email by clicking on the following link: http://localhost:3000/confirm-email/${user._id}`,
  });
  // check if email sent successfully
  if (!emailSent)
    return next(new Error('Failed to send confirmation email', { cause: 500 }));

  return res.status(201).json({
    success: true,
    message: 'User created successfully',
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  // find user
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new Error('Invalid email or password', { cause: 400 }));
  // compare password
  const isMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!isMatch)
    return next(new Error('Invalid email or password', { cause: 400 }));
  // generate token
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    },
  );
  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
});
