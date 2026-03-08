import { where } from 'sequelize';
import { User } from '../../../DB/models/user.model.js';

export const signup = async (req, res, next) => {
  try {
    // data >> req.body
    const { name, age, email, password } = req.body;
    // check for user exist
    const user = await User.findAll({ where: email });
    if (user.length > 0) {
      return res.json({
        success: false,
        message: 'User is already existed!',
      });
    }
    // add to database
    User.create({ name, age, email, password });
    // send response
    return res.json({
      success: true,
      message: 'You can login now!',
    });
  } catch (error) {
    return res.json({
      success: true,
      message: error.errors[0].message,
    });
  }
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  const user = User.findOne({ where: { email, password } });
  if (user.length == 0)
    return res.json({
      success: false,
      message: 'user not found!',
    });
  return res.json({ success: true, message: 'login successfully' });
};
