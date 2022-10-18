const express = require('express');
const app = express();
const PORT = 5000;
const UserController = require('./controllers/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/users/register', UserController.createUser);
app.listen(PORT, () => { console.log(`Server running in : http://localhost:${PORT}`) })