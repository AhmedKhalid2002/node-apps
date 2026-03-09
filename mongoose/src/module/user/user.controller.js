import { User } from '../../../DB/model/user/user.model.js';

export const createUser = async (req, res, next) => {
  const { email, age, password } = req.body;

  const user = await User.create({ email, password, age });

  return res.json({
    successs: true,
    message: 'User added successfully',
    user,
  });
};

export const allUser = async (req, res, next) => {
  const users = await User.find();

  return res.json({
    successs: true,
    users,
  });
};

export const filterUser = async (req, res, next) => {
  // find({هنا بكتب الشرط اللى من خلاله بعمل filter},{هنا بشوف اى البيانات اللى بظهرها})
  const age = req.query;
  const users = await User.find({ age: { $gt: age } }, { email: 1 });
  return res.json({
    successs: true,
    users,
  });
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  // findByIdAndUpdate(search by id,{اللى هيتعدل},{اظهار القيمه بعدل التعديل باستخدام new})
  const user = await User.findByIdAndUpdate(id, { age: 40 },{new:true});
   return res.json({
    successs: true,
    message:"user updated successfully",
    user,
  });
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
   return res.json({
    successs: true,
    message:"user deleted successfully",
    user,
  });
};
