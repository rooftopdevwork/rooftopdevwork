require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.EXPRESS_PORT || 4000;

const app = express();

app.use(express.static(path.resolve(__dirname, './client/public')))
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/more', (req, res) => {
  res.send('hey');
})
app.get('/use', (req, res) => {
  res.send('great');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))