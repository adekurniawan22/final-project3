const express = require('express');
const app = express();
const PORT = 5000;
const userRouter = require('./routes/userRoute');
const categoriesRouter = require('./routes/categoriesRoute');
const productRouter = require('./routes/productRoute')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRouter);
app.use(categoriesRouter);
app.use(productRouter);
app.listen(PORT, () => { console.log(`Server running in : http://localhost:${PORT}`) });