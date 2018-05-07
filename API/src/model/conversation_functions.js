var watson = require('watson-developer-cloud');
require('dotenv').load();
const conversation =  new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: '2018-02-16'});
const params = {
  workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
  export: true,
  include_count: true};
const map = {
  "Proyectos Modulares": "pm",
  "Servicio Social": "ss",
  "Calendario Oficial": "co",
  "Malla Curricular": "ma",
  "Prácticas Profesionales": "pp",
  "Materias Optativas y Especializantes": "moe"
}
let availableAreas = [];

var functions = (function() {
  var getIntents = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listIntents(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.intents);
        }
      });
    });
  }

  var getEntities = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listEntities(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.entities);
        }
      });
    });
  }

  var getDialog = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listDialogNodes(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.dialog_nodes);
        }
      });
    });
  }

  var getDialogNode = function(dialogNode) {
    return new Promise(function(fulfill, reject) {
      params.dialog_node = dialogNode;
      conversation.getDialogNode(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response);
        }
      });
      delete params.dialog_node;
    });
  }

  var getQuestions = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listIntents(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          let questions = [];
          for(i in response.intents){
            for(j in response.intents[i].examples){
              questions.push({name:response.intents[i].examples[j].text});
            }
          }
          fulfill(questions);
        }
      });
    });
  }

  var getFatherNodes = function(){
    return new Promise(function(fulfill,reject){
      params.dialog_node = 'Bienvenido';
      conversation.getDialogNode(params, function(err, initialNode) {
      if (err) {
        reject(404);
      } else {
        availableAreas = initialNode.context.areas;
        let nodes = [];
        conversation.listDialogNodes(params, function(err, response) {
          if (err) { reject(404); }
          else {
            for(i in availableAreas){
              for(j in response.dialog_nodes){
                if(availableAreas[i] === response.dialog_nodes[j].title){
                  nodes.push(response.dialog_nodes[j]);
                }
              }
            }
          fulfill(nodes);
          }
        });
      }
      });
    })
  }

  var getForm = function() {
    return new Promise(function(fulfill, reject) {
      let format = [];
      getFatherNodes().then(function(data) {
        for(i in availableAreas){
          for(j in data){
            if(availableAreas[i] === data[j].title){
              let variables = [];
              let temp_json = data[j].context[map[data[j].title]];
              for(x in temp_json){
                variables.push({'field': x,'currentValue': temp_json[x]});
              }
              format.push({'area': data[j].title,'variables': variables});
            }
          }
        }
        fulfill(format);
      }).catch(function(err) {
        reject(err);
      })
    });
  }

  var updateContextVariable = function(dialogNode, contextVariable) {
    return new Promise(function(fulfill, reject) {
      params.dialog_node = dialogNode;
      params.new_dialog_node = dialogNode;
      params.new_context = contextVariable;
      conversation.updateDialogNode(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response);
        }
      });
      delete params.dialog_node;
      delete params.new_dialog_node;
      delete params.new_context;
    });
  }

  var updateForm = function(newNode) {
    return new Promise(function(fulfill, reject) {
      if(newNode && newNode.variables && newNode.area){
        let contextVariable = {};
        let updatedNode = null;
        getFatherNodes().then(function(allNodes) {
          for(i in allNodes){
            if(allNodes[i].title === newNode.area){
              for(k in newNode.variables){
                contextVariable[newNode.variables[k].field] = newNode.variables[k].currentValue;
              }
              allNodes[i].context[map[allNodes[i].title]] = contextVariable;
              updatedNode = allNodes[i];
            }
          }
          if(updatedNode != null){
            updateContextVariable(updatedNode.dialog_node, updatedNode.context).then(function(response) {
              fulfill(response);
            }).catch(function(err) {
              reject(500);
            })
          } else {
            reject(404);
          }
        }).catch(function(err) {
          reject(err);
        })
      } else {
        reject(400);
      }
    });
  }

  var askWatson = function(question){
    return new Promise(function(fulfill,reject){
      conversation.message({
        workspace_id: params.workspace_id,
        alternate_intents: true,
        input: { 'text': question.text },
      }, function(err, response) {
        if (err) {
          reject(err);
        } else {
          fulfill(response.output.text);
        }
      });
    });
  };

  return {
    'getQuestions': getQuestions,
    'getForm': getForm,
    'updateForm': updateForm,
    'askWatson': askWatson
  };

})();
module.exports = functions;
