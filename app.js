const express = require('express');
const app = express();
const PORT = 5000;
const userRouter = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRouter = require('./routes/productRoute')
const transactionRoutes = require('./routes/transactionRoute')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRouter);
app.use(categoryRoute);
app.use(productRouter);
app.use(transactionRoutes);

app.listen(PORT, () => { console.log(`Server running on PORT ${PORT}`) });