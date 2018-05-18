let Components = (function() {

  return {
    buildButtons: buildButtons,
    buildGraph: buildGraph,
    buildCalendar: buildCalendar
  }

  function buildCalendar(calendar, newPayload, settings) {
    console.log('build calendar called');

    //Creates a variable that holds the value of a button rendered by renderButtons
    let calendarComponent = renderCalendar(calendar, newPayload);

    //Attaches all created buttons to the chatbox area
    let chatBoxElement = document.querySelector(settings.selectors.chatBox);
    calendarComponent.forEach(function(currentDiv) {
      chatBoxElement.appendChild(currentDiv);
      // Class to start fade in animation
      currentDiv.classList.add('load');
    });
    ConversationPanel.scrollToChatBottom();
  }

  function renderCalendar(graph, newPayload) {
    console.log('render calendar invoked')
    let messageArray = [];

    let calendarJson = {
      // <div class='segments'>
      'tagName': 'div',
      'classNames': ['segments', 'animated', 'fadeInUp'],
      'children': [{
        // <div class='from-user/from-watson latest'>
        'tagName': 'div',
        'classNames': ['latest', ((messageArray.length === 0) ? 'top' : 'sub')],
        'children': [{
          "tagName": "div",
          'classNames': ['message-inner', 'bx--tile'],
          'children': [{
            'tagName': 'div',
            'classNames': ['bx--form-item'],
            "children": [{
              'tagName': 'div',
              'classNames': ['bx--date-picker', 'bx--date-picker--range'],
              'attributeData': [{
                'name': 'data-date-picker'
              }],
              'attributes': [{
                'name': 'data-date-picker-type',
                'value': 'range'
              }],
              'children': [{
                'tagName': 'div',
                'classNames': ['bx--date-picker-container'],
                'children': [{
                  'tagName': 'label',
                  'classNames': ['bx--label'],
                  'text': 'From',
                  'attributes': [{
                    'name': 'For',
                    'value': 'date-picker-1'
                  }]
                }, {
                  'tagName': 'input',
                  'classNames': ['bx--date-picker__input', 'fromDate'],
                  'attributes': [{
                    'name': 'type',
                    'value': 'text'
                  }, {
                    'name': 'pattern',
                    'value': '\\d{1,2}/\d{1,2}/\d{4}'
                  }, {
                    'name': 'placeholder',
                    'value': 'mm/dd/yyyy'
                  }],
                  'attributeData': [{
                    'name': 'data-date-picker-input-from'
                  }, {
                    'name':'name',
                    'value':'fromDate'
                  }]
                }, {
                  'tagName': 'div',
                  'classNames': ['bx--form-requirement'],
                  'children': [{
                    'tagName': 'p',
                    'text': 'Invalid date format.'
                  }]
                }]
              }, {
                'tagName': 'div',
                'classNames': ['bx--date-picker-container'],
                'children': [{
                  'tagName': 'label',
                  'classNames': ['bx--label'],
                  'text': 'To',
                  'attributes': [{
                    'name': 'For',
                    'value': 'date-picker-2'
                  }]
                }, {
                  'tagName': 'input',
                  'classNames': ['bx--date-picker__input', 'toDate'],
                  'attributes': [{
                    'name': 'type',
                    'value': 'text'
                  }, {
                    'name': 'pattern',
                    'value': '\\d{1,2}/\d{1,2}/\d{4}'
                  }, {
                    'name': 'placeholder',
                    'value': 'mm/dd/yyyy'
                  }],
                  'attributeData': [{
                    'name': 'data-date-picker-input-to'
                  }, {
                    'name':'name',
                    'value':'toDate'
                  }]
                }, {
                  'tagName': 'div',
                  'classNames': ['bx--form-requirement'],
                  'children': [{
                    'text': 'Invalid date format.'
                  }]
                }]
              }, {
                'tagName': 'svg',
                'classNames': ['bx--date-picker__icon'],
                'attributeData': [{
                  'name': 'data-date-picker-icon'
                }],
                'attributes': [{
                  'name': 'width',
                  'value': '17'
                }, {
                  'name': 'height',
                  'value': '19'
                }, {
                  'name': 'viewBox',
                  'value': '0 0 17 19'
                }],
                'children': [{
                  'tagName': 'path',
                  'attributes': [{
                    'name': 'd',
                    'value': 'M12 0h2v2.7h-2zM3 0h2v2.7H3z'
                  }]
                }, {
                  'tagName': 'path',
                  'attributes': [{
                    'name': 'd',
                    'value': 'M0 2v17h17V2H0zm15 15H2V7h13v10z'
                  }]
                }, {
                  'tagName': 'path',
                  'attributes': [{
                    'name': 'd',
                    'value': 'M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z'
                  }]
                }]
              }]
            }]
          }, {
            'tagName': 'button',
            'classNames': ['bx--btn', 'bx--btn--primary', 'submitDate'],
            "text": "Submit"
          }]
        }]
      }]
    }
    messageArray.push(Common.buildDomElement(calendarJson));
    return messageArray;
  }


  function buildGraph(graph, newPayload, settings) {
    //Creates a variable that holds the value of a button rendered by renderButtons
    let graphCard = renderGraph(graph, newPayload);

    //Attaches all created buttons to the chatbox area
    let chatBoxElement = document.querySelector(settings.selectors.chatBox);
    graphCard.forEach(function(currentDiv) {
      chatBoxElement.appendChild(currentDiv);
      // Class to start fade in animation
      currentDiv.classList.add('load');
    });
    ConversationPanel.scrollToChatBottom();
  }


  function renderGraph(graph, newPayload) {
    let messageArray = [];

    let graphJson = {
      // <div class='segments'>
      'tagName': 'div',
      'classNames': ['segments', 'animated', 'bounceIn'],
      'children': [{
        // <div class='from-user/from-watson latest'>
        'tagName': 'div',
        'classNames': ['latest', ((messageArray.length === 0) ? 'top' : 'sub')],
        'children': [{
          "tagName": "div",
          'classNames': ['bx--tile'],
          'children': [{
            'tagName': 'div',
            'classNames': ['message-inner'],
            "children": [{ // <p>{messageText}</p>
              'tagName': 'h3',
              "text": graph.name
            }, {
              'tagName': 'p',
              "text": 'Company: ' + graph.company
            }, {
              'tagName': 'p',
              "text": 'Role: ' + graph.role
            }, {
              'tagName': 'p',
              "text": 'Address: ' + graph.address
            }, {
              'tagName': 'p',
              "text": 'Phone: ' + graph.phone
            }, {
              'tagName': 'p',
              "text": 'Paid time off days left: ' + graph.pto
            }, {
              'tagName': 'a',
              'classNames': ['bx--btn', 'bx--btn--secondary'],
              "text": "View full profile",
              "attributes": [{
                "name": "href",
                "value": graph.url,
              }, {
                "name": "target",
                "value": "_blank"
              }],
            }, {
              // 'tagName': 'button',
              // 'classNames': ['bx--btn', 'bx--btn--secondary', 'actionButton'],
              // "text": "Edit profile"
            }]
          }]
        }]
      }]
    }
    messageArray.push(Common.buildDomElement(graphJson));
    return messageArray;
  }

  function buildButtons(buttons, newPayload, settings) {

    //Creates a variable that holds the value of a button rendered by renderButtons
    let buttonArray = renderButtons(buttons, newPayload);

    //Attaches all created buttons to the chatbox area
    let chatBoxElement = document.querySelector(settings.selectors.chatBox);
    buttonArray.forEach(function(currentDiv) {
      chatBoxElement.appendChild(currentDiv);
      // Class to start fade in animation
      currentDiv.classList.add('load');
    });
    ConversationPanel.scrollToChatBottom();
  }

  function renderButtons(buttons, newPayload) {
    let messageArray = [];
    let buttonJson;
    buttons.forEach(function(currentLabel) {
      if (currentLabel) {
        if (currentLabel.url) {
          buttonJson = {
            'tagName': 'div',
            'classNames': ['userButton', 'latest'],
            'children': [{
              // <div class='message-inner'>
              'tagName': 'div',
              'classNames': ['message-inner'],
              'children': [{
                // <p>{messageText}</p>
                'tagName': 'button',
                'classNames': ['bx--btn', 'bx--btn--secondary', 'modalButton'],
                'children': [{
                  'tagName':'a',
                  'text': currentLabel.value,
                  'attributes':[{
                    'name':'data-modal-target',
                    'value': '#modal'
                  }]
                }, {
                  'tagName':'p',
                  'classNames':['hide'],
                  'text':currentLabel.url
                }]
              }]
            }]
          };
        } else {
          buttonJson = {
            'tagName': 'div',
            'classNames': ['userButton', 'latest'], // answer
            'children': [{
              // <div class='message-inner'>
              'tagName': 'div',
              'classNames': ['message-inner'],
              'children': [{
                // <p>{messageText}</p>
                'tagName': 'button',
                'classNames': ['bx--btn', 'bx--btn--secondary', 'actionButton'],
                "text": currentLabel.value,
              }]
            }],
          };
        }

        messageArray.push(Common.buildDomElement(buttonJson));
      }
    });
    return messageArray;
  }

}());
