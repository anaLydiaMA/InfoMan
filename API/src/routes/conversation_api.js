 var tools = require('../model/conversation_functions');
var express = require('express');
var router = express.Router();
require('dotenv').load();


router.route('/questions')
  .get(function(req, res) {
    tools.getQuestions().then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.route('/form')
  .get(function(req, res) {
    tools.getForm().then(function(completeForm) {
      res.status(200).send(completeForm);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.route('/update')
  .put(function(req, res) {
    tools.updateForm(req.body).then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.post('/askWatson',function(req,res){
  tools.askWatson(req.body).then(function(data){
    res.status(200).send(data);
  }, function rejected(err){
    res.status(err).send({});
  });
});

module.exports = router;
