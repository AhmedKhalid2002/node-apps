import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './DB/connection.js';
import userRoutes from './src/modules/user/user.route.js';
import productRoutes from './src/modules/product/product.route.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// routes
// user routes
app.use('/user', userRoutes);

// product routes
app.use('/product', productRoutes);
// connect to database
await connectDB();

// global error handler
app.use((error, req, res, next) => {
  const statusCode = error.cause || 500;
  return res.status(statusCode).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});

// not found handler
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
