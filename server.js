require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;

const MongoClient = require('mongodb').MongoClient
const mongoUrl = process.env.MONGODB_URI

let db;

const app = express();

app.use(express.static(path.resolve(__dirname, './client/public')))

app.get('/threats', async (req, res) => {
  const collection = db.collection('threats')

  const threats = await collection.find().toArray()

  res.send({ threats });
})

app.get('/evacuations', async (req, res) => {
  const collection = db.collection('evacuations')

  const evacuations = await collection.find().toArray()

  res.send({ evacuations });
})

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) return console.log(err);

  db = client.db()

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
