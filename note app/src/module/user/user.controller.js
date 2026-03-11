import { User } from '../../../DB/model/user.model';

export const signup = async (req, res, next) => {
  try {
    // data email password age
    const { email, confirmPassword, password, age } = req.body;
    // check password
    if (password != confirmPassword)
      return res.json({
        success: true,
        message: 'Password must match!',
      });
    // check email
    const isUser = await User.findOne({ email });
    if (isUser)
      return res.json({
        success: false,
        message: 'Email already existed!',
      });
    // create user
    const user = await User.create({ password, age, email });
    // send response
    res.json({
      success: true,
      messege: 'You can login Now',
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
};

export const login = async (req, res, next) => {
  // data
  const { email, password } = req.body;
  // check user
  const user = await User.findOne({ email });
//   check email
  if (!user)
    return res.json({
      success: false,
      message: 'email is invalid',
    });
  // check password
  if (password !== user.password)
    return res.json({
      success: false,
      message: 'password is invalid',
    });
  return res.json({
    success: true,
    message: 'User login successfully ',
  });
};
