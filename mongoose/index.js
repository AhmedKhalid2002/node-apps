import express from 'express';
import cors from 'cors';
import { connectDB } from './DB/connection.js';
import userRouter from './src/module/user/user.route.js';
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// connect database
await connectDB();

// user route 
app.use('/user', userRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
