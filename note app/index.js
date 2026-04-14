import express from 'express';
import cors from 'cors';
import { connectDb } from './DB/connection.js';
import userRouter from './src/module/user/user.router.js';
import noteRouter from './src/module/note/note.router.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
await connectDb();

// Api
// user
app.use('/user', userRouter);

// note هو اللى بيحتوى على كل ال endpoints الخاصة بال notes
app.use('/note', noteRouter);

// not found

// app.all('/*', (re, res, next) => {
//   res.json({
//     success: false,
//     message: 'Page Not Found!',
//   });
// });
// التحديث الجديد للتعامل مع ال not found و ال global error handler
app.use( (req, res, next) => {
  res.json({
    success: false,
    message: 'Page Not Found!',
  });
});

// global error handler هو اللى بيستقبل اى error بيحصل فى ال controller و بيرسله هنا عشان يرد بيه على ال client
app.use((error, req, res, next) => {
  res.json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
