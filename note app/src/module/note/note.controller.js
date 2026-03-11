// create note

import { Note } from '../../../DB/model/note.model.js';
import { User } from '../../../DB/model/user.model.js';

export const createNote = async (req, res, next) => {
  try {
    // data
    const { content, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User not found!'));
    // res.json({
    //   success: false,
    //   message: 'User not found!',
    // });

    const note = Note.create({ content, user: userId });
    res.json({
      success: true,
      note,
      message: 'Note created successfully',
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const updateNote = async (req, res, next) => {
  try {
    // data
    const { isCompleted, userId } = req.body;
    const { id } = req.params;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User not found!'));
    // res.json({
    //   success: false,
    //   message: 'User not found!',
    // });
    const note = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { isCompleted: isCompleted },
    );
    if (!note) {
      return next(new Error('note id is invalid or you are not owner'));
      // return res.json({
      //   success: false,
      //   message: 'note id is invalid or you are not owner',
      // });
    }
    return res.json({
      success: true,
      message: 'Note Updated successfully',
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    // data
    const { userId } = req.body;
    const { id } = req.params;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User not found!'));
    // res.json({
    //   success: false,
    //   message: 'User not found!',
    // });
    const note = await Note.findById(id);
    if (!note) return next(new Error('note not found'));
    // return res.json({ success: false, message: 'note not found' });

    if (note.user.toString() !== userId)
      return next(new Error('you not owner'));
    // return res.json({ success: false, message: 'you not owner' });

    await note.deleteOne();
    await note.save();
    return res.json({
      success: true,
      message: 'Note Updated successfully',
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const allNotes = async (req, res, next) => {
  try {
    // فائده ال populate بانها بتعمل فك العنصر ولازم يكون جزء من ال model  وبيشاور على ال model hggn jhkn  زى مثلا user id
    // const notes = await Note.find().populate("user");

    // لو عايز ال اظهر ال email
    // - id اخفاء ال
    const notes = await Note.find().populate({
      path: 'user',
      select: 'email age -_id',
    });

    return res.json({
      success: true,
      notes,
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const userNote = async (req, res, next) => {
  try {
    const { id } = req.params; //user id
    const user = await User.findById(id);
    if (!user) return next(new Error('User not found!'));
    const note = await Note.findOne({ user: id });

    return res.json({
      success: true,
      note,
    });
  } catch (error) {
    return next(error);
  }
};
