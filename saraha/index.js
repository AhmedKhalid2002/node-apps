import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './DB/connection.js';

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// parse
app.use(express.json());
// DB connection
await connectDb();
// user routes

// not found
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  return next(error);
});

// global error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
