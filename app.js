'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const watson = require('watson-developer-cloud');
const app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create the service wrapper
let conversation = watson.conversation({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version: 'v1',
  version_date: '2018-03-20'
});

app.post('/api/message', (req, res) => {
  let payload = {
    workspace_id: process.env.WORKSPACE_ID,
    context: req.body.context || {},
    input: req.body.input || {},
  };
  // Send the input to the conversation service
  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(res, data));
  });
});

app.post('/api/feedback', (req, res) => {
  let question = req.body.question;
  let informationToGet = req.body.informationToGet;
  let comments = req.body.components;
  console.log('Go the following info: ' + question, informationToGet, comments);

  // Then do something wiht the feedback
  res.status(200).json('Feedback has been posted');

  /*
  Other things that can be done in here include plugging into a DB for later retrieval,
  connecting it with analytics, the possibilities are endless.
  */
});

function updateMessage(res, data) {
  if (!data.output) {
    data.output = {};
    return data;
  } else {
    for (let i = 0; i < data.intents.length; i++) {
      if (data.intents[i].intent == "goodFeedback" || data.intents[i].intent == "badFeedback") {
        data.output.text = "Thanks for the feedback! We'll keep this in mind.";
      }
    }
    return data;
  }
}

module.exports = app;
