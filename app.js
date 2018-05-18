'use strict';

const express = require('express'); // app server
const bodyParser = require('body-parser'); // parser for post requests
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

const watson = require('watson-developer-cloud');
const app = express();
const exphbs = require('express-handlebars');

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/', function(req, res) {
  var {user, password} = {user: req.body.username, password: req.body.password};
  if (user == "admin" && password == "tributologia") res.render('feed');
  else res.send("¿A dónde crees que vas?");
});

// Calls admin page for feed InfoMan
// app.get('/infoman-admin', function(req, res) {
//   res.render('feed');
// });

// Create the service wrapper
let conversation = watson.conversation({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version: 'v1',
  version_date: '2017-04-21'
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

// Not Used
// app.post('/api/feedback', (req, res) => {
//   let question = req.body.question;
//   let informationToGet = req.body.informationToGet;
//   let comments = req.body.comments;
//   console.log('Got the the following info: ' + question, informationToGet, comments);
//
//   //Then do something with the feedback
//   res.status(200).json('Feedback has been posted')
//
//   /*
//   Other things that can be done in here include plugging into a DB for later retrieval,
//   connecting it with analytics, the possibilities are endless.
//   */
// });

function updateMessage(res, data) {
  if (!data.output) {
    data.output = {};
    return data;
  } else {
    for (let i = 0; i < data.intents.length; i++) {
      if (data.intents[i].intent == "goodFeedback" || data.intents[i].intent == "badFeedback") {
        data.output.text = "Thanks for the feedback! We'll keep this in mind."
      }
      /*
      Detect intents and ceate output helpfulResponse
      if (data.intents[i].intent == "<name of intent here>") {
        do some action here...
      }
    }
      */
    }
    return data
  }
}

module.exports = app;
