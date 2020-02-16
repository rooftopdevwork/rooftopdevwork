require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;

const Amadeus = require('amadeus');
const MongoClient = require('mongodb').MongoClient
const mongoUrl = process.env.MONGODB_URI

let db;

const app = express();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

app.use(express.static(path.resolve(__dirname, './client/public')))

app.get('/threats', async (req, res) => {
  const collection = db.collection('threats')

  const threats = await collection.find().toArray()

  res.send({ threats });
})

app.get('/evacuations', async (req, res) => {
  const results = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SFO',
    destinationLocationCode: 'PDX',
    departureDate: '2020-02-16',
    adults: '2'
  })

  const body = results.body

  const data = JSON.parse(body)

  // const collection = db.collection('evacuations')

  // const evacuations = await collection.find().toArray()

  res.send({ evacuations: data });
})

app.get('/privacy', async (req, res) => {
  res.send('Privacy policy - we will not sell your data. It is hosted on Heroku, which is owned by Salesforce. See source code at https://github.com/rooftopdevwork/rooftopdevwork')
})

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db()

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
