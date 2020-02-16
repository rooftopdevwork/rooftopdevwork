import { render } from 'react-dom';
import React from 'react';
import App from './components/App'


function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': process.env.GOOGLE_API_KEY,
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': process.env.OAUTH_CLIENT_ID,
    'scope': 'profile',
  })
};

// 1. Load the JavaScript client library.
gapi.load('client', start);

render(<App />, document.getElementById('app'));
