const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => { res.send('Success') });
app.listen(PORT, () => { console.log(`Server running in : http://localhost:${PORT}`) })