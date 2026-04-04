import { Message } from '../../../DB/model/message.model.js';
import { User } from '../../../DB/model/user.model';
import { asyncHandler } from '../../../utils/asyncHandler';

export const sendMessage = asyncHandler(async (req, res, next) => {
  // check reciver
  const user = await User.findById(req.body.reciver);
  if (!user) return next(new Error('Invalid reciver id'));
  // create message
  await Message.create({
    sender: req.user._id,
    receiver: req.body.reciver,
    content: req.body.content,
  });

  return res.status(201).json({
    success: true,
    message: 'Message sent successfully',
  });
});
