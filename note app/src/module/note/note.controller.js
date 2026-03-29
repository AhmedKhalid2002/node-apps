// create note
import { Note } from '../../../DB/model/note.model.js';
import { User } from '../../../DB/model/user.model.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
export const createNote = asyncHandler(async (req, res, next) => {
  const userInfo = req.pyload; // ال payload اللى جايه من ال authentication
  // data
  const { content} = req.body;


  const note = Note.create({ content, user: userInfo.id });
  res.json({
    success: true,
    note,
    message: 'Note created successfully',
  });
});

export const updateNote = asyncHandler(async (req, res, next) => {
  // data
  const { isCompleted } = req.body;
  const { id } = req.params;
   const userInfo = req.pyload; // ال payload اللى جايه من ال authentication

  const note = await Note.findOneAndUpdate(
    { _id: id, user: userInfo.id },
    { isCompleted: isCompleted },
  );
  if (!note) {
    return next(new Error('note id is invalid or you are not owner'));
  }
  return res.json({
    success: true,
    message: 'Note Updated successfully',
  });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
  // data
  const { id } = req.params;
   const userInfo = req.pyload; // ال payload اللى جايه من ال authentication

  // res.json({
  //   success: false,
  //   message: 'User not found!',
  // });
  const note = await Note.findById(id);
  if (!note) return next(new Error('note not found'));
  // return res.json({ success: false, message: 'note not found' });

  if (note.user.toString() !== userInfo.id) return next(new Error('you not owner'));
  // return res.json({ success: false, message: 'you not owner' });

  await note.deleteOne();
  await note.save();
  return res.json({
    success: true,
    message: 'Note Updated successfully',
  });
});

export const allNotes = asyncHandler(async (req, res, next) => {
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
});

export const userNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params; //user id
  const user = await User.findById(id);
  if (!user) return next(new Error('User not found!'));
  const note = await Note.findOne({ user: id });

  return res.json({
    success: true,
    note,
  });
});
