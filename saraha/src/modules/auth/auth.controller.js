import Joi from 'joi';
import asyncHandler from '../../../utils/asyncHandler.js';
import { User } from '../../../DB/model/user.model.js';
export const signUp = asyncHandler(async (req, res) => {
  // validation
  const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    age: Joi.number().integer().min(18).required(),
    name: Joi.string().min(3).max(30).required(),
  }).required();

  const { error, value } = signupSchema.validate(req.body, {
    abortEarly: false,
  });
  // check validation error
  if (error) {
    return next(new Error(error.details.map((err) => err.message).join(', ')));
  }
  //   hash password
  const hashPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS);
  // create user
  const user = await User.create({ ...req.body, password: hashPassword });
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
