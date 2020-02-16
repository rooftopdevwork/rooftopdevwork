require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.EXPRESS_PORT || 4000;

const MongoClient = require('mongodb').MongoClient
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'evacuate'

let db;

const app = express();

app.use(express.static(path.resolve(__dirname, './client/public')))

app.get('/threats', async (req, res) => {
  const collection = db.collection('threats')

  const threats = await collection.find().toArray()

  res.send({ threats });
})

app.get('/use', (req, res) => {
  res.send('great');
})

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) return console.log(err);

  db = client.db(dbName)

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
