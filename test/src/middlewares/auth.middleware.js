import { Token } from '../../DB/models/Token/Token.model.js';
import { User } from '../../DB/models/user/user.model.js';

export const isAuthandicated = async (req, res, next) => {
  const { token } = req.headers;
  // check if token is present
  if (!token) return next(new Error('Unauthorized Access'));
  // Berar token
  if (!token.startWith(process.env.BEARER_KEY))
    return next(new Error('Invalid Token'));
  // get token from header
  const accessToken = token.split(process.env.BEARER_KEY)[1];
  // verify token
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

  const tokenDb = await Token.findOne({ token: accessToken, isValid: true });
  //   check if token is present in database
  if (!tokenDb) return next(new Error('Invalid Token'));

  const user = await User.findOneById(payload.id);
  if (!user) return next(new Error('User Not Found'));
  req.user = user;
  next();
};
