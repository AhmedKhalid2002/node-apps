import express from 'express';
import cors from 'cors';
import { connectDb } from './DB/connection.js';
import userRouter from './src/module/user/user.router.js';
import noteRouter from './src/module/note/note.router.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
await connectDb();

// Api
// user
app.use('/user', userRouter);

// note
app.use('/note', noteRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
