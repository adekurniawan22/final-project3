const express = require('express');
const app = express();
const PORT = 5000;
const userRouther = require('./routes/userRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRouther);
app.listen(PORT, () => { console.log(`Server running in : http://localhost:${PORT}`) });