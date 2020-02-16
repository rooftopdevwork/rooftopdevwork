require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;

const Amadeus = require('amadeus');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = process.env.MONGODB_URI;

const docusign = require('docusign-esign');
// const path = require('path');
const apiClient = new docusign.ApiClient();
const fs = require('fs');

let db;

const app = express();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

app.use(express.static(path.resolve(__dirname, './client/public')));

app.get('/threats', async (req, res) => {
  const collection = db.collection('threats');

  const threats = await collection.find().toArray();

  res.send({ threats });
});

app.get('/evacuations', async (req, res) => {
  const results = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SFO',
    destinationLocationCode: 'PDX',
    departureDate: '2020-02-16',
    adults: '2'
  });

  const body = results.body;

  const data = JSON.parse(body);

  // const collection = db.collection('evacuations')

  // const evacuations = await collection.find().toArray()

  res.send({ evacuations: data });
});

app.get('/privacy', async (req, res) => {
  res.send(
    'Privacy policy - we will not sell your data. It is hosted on Heroku, which is owned by Salesforce. See source code at https://github.com/rooftopdevwork/rooftopdevwork'
  );
});

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db();

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

/// begin docusgin

app.get('/docusign', function(req, res) {
  const OAuthToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU4MTg4MzkzNCwiZXhwIjoxNTgxOTEyNzM0LCJVc2VySWQiOiI5ZmU4NmU2MC01Zjg3LTQ1OGUtYTUzNi0xZDU1NzQ4NGRlZTUiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiOWZlODZlNjAtNWY4Ny00NThlLWE1MzYtMWQ1NTc0ODRkZWU1IiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU4MTg4MzkzMiwicHdpZCI6IjlkYjE1YWI1LWE2ZWMtNDhkNS1hZDM3LTczMGMzZDNjYTViZiJ9.MnSgbhhhxBTX1MtKqy_fe-GZJceGaS8-tUenF0kOwjoBGv2cb985NN9FMyWJTXcXrQKNwdYkQvXWN8F2JcV4ItoCxXyP6-aH2rUuHva0smK2-UEc8lTWRy4eNFABO7LQZAAMSQU81cVItYXTH8cRTFKt0Wt17DLVqvMa0PDm-hrX_D4RByEfsQV72hM5YTWx1F8lexPL94ltPnQQSnuyDt1fOCc6aXic4Qydg2lk9r2_gWUsvPHdWVverjNLUzW-FEsslrKxbUdB6ySMt8B4SZYasqRgwGH3Ay_Nesc6OOFYwKYg_l0ssa4Dmephy2I_n5Ng_CyBOhUencLWApmu0Q';
  const accountId = 'f5afd249-305e-4cc8-a456-d16380991b61';
  // const accountId = 'f5afd249-305e-4cc8-a456-d16380991b61';
  // const accountId = '9fe86e60-5f87-458e-a536-1d557484dee5';

  //Recipient Information goes here
  const recipientName = 'mario';
  // const recipientEmail = 'yi.kan.mui@gmail.com';
  const recipientEmail = 'yi.kan.mui@gmail.com';

  //Point this to the document you wish to send's location on the local machine. Default location is __workingDir\fileName
  const fileName = 'files/House.pdf'; //IE: test.pdf
  // const fileName = 'docs/test2.pdf';
  apiClient.setBasePath('https://demo.docusign.net/restapi');
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + OAuthToken);

  // *** Begin envelope creation ***

  //Read the file you wish to send from the local machine.
  // fileStream = process.argv[2];
  let pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName));
  let pdfBase64 = pdfBytes.toString('base64');

  docusign.Configuration.default.setDefaultApiClient(apiClient);

  var envDef = new docusign.EnvelopeDefinition();

  //Set the Email Subject line and email message
  envDef.emailSubject = 'Please sign this document sent from Node SDK';
  envDef.emailBlurb =
    'Please sign this document sent from the DocuSign Node.JS SDK.';

  //Read the file from the document and convert it to a Base64String
  var doc = new docusign.Document();
  doc.documentBase64 = pdfBase64;
  doc.fileExtension = 'pdf';
  doc.name = 'Node Doc Send Sample';
  doc.documentId = '1';

  //Push the doc to the documents array.
  var docs = [];
  docs.push(doc);
  envDef.documents = docs;

  //Create the signer with the previously provided name / email address
  var signer = new docusign.Signer();
  signer.name = recipientName;
  signer.email = recipientEmail;
  signer.routingOrder = '1';
  signer.recipientId = '1';

  //Create a tabs object and a signHere tab to be placed on the envelope
  var tabs = new docusign.Tabs();

  var signHere = new docusign.SignHere();
  signHere.documentId = '1';
  signHere.pageNumber = '1';
  signHere.recipientId = '1';
  signHere.tabLabel = 'SignHereTab';
  signHere.xPosition = '50';
  signHere.yPosition = '50';

  //Create the array for SignHere tabs, then add it to the general tab array
  let signHereTabArray = [];
  signHereTabArray.push(signHere);

  tabs.signHereTabs = signHereTabArray;

  //Then set the recipient, named signer, tabs to the previously created tab array
  signer.tabs = tabs;

  //Add the signer to the signers array
  var signers = [];
  signers.push(signer);

  //Envelope status for drafts is created, set to sent if wanting to send the envelope right away
  envDef.status = 'sent';

  //Create the general recipients object, then set the signers to the signer array just created
  var recipients = new docusign.Recipients();
  recipients.signers = signers;

  //Then add the recipients object to the enevelope definitions
  envDef.recipients = recipients;

  // *** End envelope creation ***

  //Send the envelope
  var envelopesApi = new docusign.EnvelopesApi();
  envelopesApi.createEnvelope(
    accountId,
    { envelopeDefinition: envDef },
    function(err, envelopeSummary, response) {
      if (err) {
        return res.send('Error while sending a DocuSign envelope:' + err);
      }

      res.send(envelopeSummary);
    }
  );
});

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
