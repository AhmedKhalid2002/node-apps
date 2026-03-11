import { User } from '../../../DB/model/user.model';

export const signup = async (req, res, next) => {
  try {
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
    // create user
    await User.create({ password, age, email });
    // send response
    res.json({
      success: true,
      messege: 'You can login Now',
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const login = async (req, res, next) => {
  try {
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
    if (password !== user.password) return next('password is invalid');

    // return res.json({
    //   success: false,
    //   message: 'password is invalid',
    // });

    return res.json({
      success: true,
      message: 'User login successfully ',
    });
  } catch (error) {
    return next(new Error(error));
  }
};
