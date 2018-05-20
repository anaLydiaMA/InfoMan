var tools = require('../model/conversation_functions');
var db = require('../model/login');
var express = require('express');
var router = express.Router();
require('dotenv').load();


router.route('/conversation/questions')
  .get(function(req, res) {
    tools.getQuestions().then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.route('/conversation/form')
  .get(function(req, res) {
      tools.getForm().then(function(completeForm) {
        res.status(200).send(completeForm);
      }).catch(function(err) {
        res.status(404).send({});
      })
    })

router.route('/conversation/update')
  .put(function(req, res) {
    tools.updateForm(req.body).then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.post('/conversation/askWatson',function(req,res){
  tools.askWatson(req.body).then(function(data){
    res.status(200).send(data);
  }, function rejected(err){
    res.status(404).send({});
  });
});

router.route('/user/list')
  .post(function(req, res) {
    db.login(req.body.username,req.body.password).then(function() {
      db.list().then(function(data) {
        res.status(200).send(data);
      }).catch(function(err) {
        res.status(404).send({});
      })
    }).catch(function(err) {
      res.status(403).send({});
    })
  })

router.route('/user/create')
  .post(function(req, res) {
    db.login(req.body.username,req.body.password).then(function() {
      req.body.username = req.body.new_username;
      req.body.password = req.body.new_password;
      delete req.body.new_username;
      delete req.body.new_password;
      db.create(req.body).then(function(data) {
        res.status(201).send(data);
      }).catch(function(err) {
        res.status(400).send({});
      })
    }).catch(function(err) {
      res.status(403).send({});
    })
  })

router.route('/user/delete/:id')
  .delete(function(req, res) {
    db.login(req.body.username,req.body.password).then(function() {
      db.destroy(req.params.id).then(function(data) {
        res.status(200).send(data);
      }).catch(function(err) {
        res.status(400).send({});
      })
    }).catch(function(err) {
      res.status(403).send({});
    })
  })

router.route('/user/login')
  .post(function(req, res) {
    db.login(req.body.username,req.body.password).then(function() {
      res.status(200).send({"status": "authorized"});
    }).catch(function(err) {
      res.status(403).send({"status": "authorized"});
    })
  })

module.exports = router;
