import asyncHandler from '../../../utils/asyncHandler.js';
import { User } from '../../../DB/model/user.model.js';
import { sendEmail } from '../../../utils/senEmial.js';
import Randomstring from 'randomstring';
export const signUp = asyncHandler(async (req, res, next) => {
  //   hash password
  const hashPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS);
  // create user
  const user = await User.create({ ...req.body, password: hashPassword });
  // send confirmation email
  const emailSent = await sendEmail({
    to: user.email,
    subject: 'Confirm your email',
    text: `Please confirm your email by clicking on the following link: http://localhost:3000/confirm-email/${user._id}`,
    html: `<a href="http://localhost:3000/confirm-email/${user._id}">Confirm your email</a>`,
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

export const login = asyncHandler(async (req, res, next) => {
  // find user
  const user = await User.findOne({ email: req.body.email });

  if (!user.isConfirmed)
    return next(
      new Error('Please confirm your email before logging in', { cause: 400 }),
    );
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

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isConfirmed: true },
    { new: true },
  ); // new to return the updated document

  if (!user)
    return next(new Error('Invalid confirmation link', { cause: 400 }));

  return res.status(200).json({
    success: true,
    message: 'Email confirmed successfully',
    user,
  });
});

export const sendResetCode = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // check if user exists
  if (!user) return next(new Error('Invalid email', { cause: 400 }));
  // check if email is confirmed
  if (!user.isConfirmed)
    return next(
      new Error(
        'Please confirm your email before requesting a password reset',
        { cause: 400 },
      ),
    );

  // generate reset code
  const restCode = Randomstring.generate({ length: 6, charset: 'numeric' });

  user.forgetCode = restCode;
  await user.save();

  // send reset code email
  const emailSent = await sendEmail({
    to: user.email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${restCode}`,
    html: `<p>Your password reset code is: <b>${restCode}</b></p>`,
  });

  if (!emailSent)
    return next(
      new Error('Failed to send password reset code', { cause: 500 }),
    );

  return res.status(200).json({
    success: true,
    message: 'Password reset code sent successfully',
  });
});
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });
  // check if user exists
  if (!user) return next(new Error('Invalid email', { cause: 400 }));
  // check if code is valid
  if (user.forgetCode !== code)
    return next(new Error('Invalid reset code', { cause: 400 }));
  // hash new password
  const hashPassword = bcrypt.hashSync(newPassword, process.env.SALT_ROUNDS);
  // update user password
  user.password = hashPassword;
  user.forgetCode =   undefined; // clear reset code
  await user.save();
  // send confirmation email
  const emailSent = await sendEmail({
    to: user.email,
    subject: 'Password Reset Successful',
    text: 'Your password has been reset successfully.',
    html: '<p>Your password has been reset successfully.</p>',
  });
  if (!emailSent)
    return next(
      new Error('Failed to send password reset confirmation', { cause: 500 }),
    );
  return res.status(200).json({
    success: true,
    message: 'Password reset successful',
  });

});
