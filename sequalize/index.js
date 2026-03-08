import express from 'express';
import cors from 'cors';
import { syncTables } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js';
import productRouter from './src/modules/product/product.router.js'
const app = express();
app.use(cors());
app.use(express());
const port = 3000;

app.use('/user', userRouter);
app.use('/product', productRouter);


await syncTables();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
