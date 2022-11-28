require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PGPORT;
const userRouter = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRouter = require('./routes/productRoute')
const transactionRoutes = require('./routes/transactionRoute')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));
app.set("view engine", "ejs");
app.get('/', (req, res) => res.render('index'));
app.use('/users', userRouter);
app.use(categoryRoute);
app.use(productRouter);
app.use(transactionRoutes);

app.listen(PORT, () => { console.log(`Server running on PORT ${PORT}`) });