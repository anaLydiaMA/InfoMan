/*
*
This code is the intellectual property of IBM GBS and is not to be used by non-GBS practitioners nor distributed outside of GBS engagements. For full usage guidelines refer to http://ibm.biz/innersourcing-consume-guidelines
*
*/

let ConversationPanel = (function() {
  // let getInput = document.getElementById('textInput').val();
  let settings = {
    selectors: {
      chatBox: '#scrollingChat',
      fromUser: '.from-user',
      fromWatson: '.from-watson',
      latest: '.latest'
    },
    authorTypes: {
      user: 'user',
      watson: 'watson'
    }
  };

  // Publicly accessible methods defined
  return {
    init: init,
    inputKeyDown: inputKeyDown,
    scrollToChatBottom: scrollToChatBottom
  };

  // Initialize the module
  function init() {
    chatUpdateSetup();
    Api.sendRequest('', null);
  }

  // Set up callbacks on payload setters in Api module
  // This causes the displayMessage function to be called when messages are sent / received
  function chatUpdateSetup() {
    //Requests
    let currentRequestPayloadSetter = Api.setRequestPayload;
    Api.setRequestPayload = function(newPayloadStr) {
      currentRequestPayloadSetter.call(Api, newPayloadStr);
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.user);
    };

    //Responses
    let currentResponsePayloadSetter = Api.setResponsePayload;
    Api.setResponsePayload = function(newPayloadStr) {
      currentResponsePayloadSetter.call(Api, newPayloadStr);

      //Create and display Messages
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.watson);

      //Check if response has buttons as a property. If so, create them
      let payload = JSON.parse(newPayloadStr);
      let outputPayload = payload.output;

      /* INSERT YOUR CUSTOM CARD NAME HERE */
      if (outputPayload.hasOwnProperty('employeeProfile')) {
        //Create graph card with information. replace object value below with your card name.
        Components.buildGraph(payload.output.employeeProfile, JSON.parse(newPayloadStr), settings)
      }
      if (outputPayload.hasOwnProperty('buttons')) {
        //Create buttons, with buttons as one input and newPayload as another input
        Components.buildButtons(payload.output.buttons, JSON.parse(newPayloadStr), settings)
      }
      if (outputPayload.hasOwnProperty('calendar')) {
        console.log('detected calendar')
        //Create buttons, with buttons as one input and newPayload as another input
        Components.buildCalendar(payload.output.calendar, JSON.parse(newPayloadStr), settings)
      }

      /* De-comment this line and fill with your customized object
      if (outputPayload.hasOwnProperty('<object name goes here>')) {
        Components.buildGraph(payload.output.<...>, JSON.parse(newPayloadStr), settings)
      }
      */
    };
  }

  // Display a user or Watson message that has just been sent/received
  function displayMessage(newPayload, typeValue) {
    let isUser = isUserMessage(typeValue);
    let textExists = (newPayload.input && newPayload.input.text) ||
      (newPayload.output && newPayload.output.text);
    if (isUser !== null && textExists) {
      // Create new message DOM element
      let messageDivs = buildMessageDomElements(newPayload, isUser);
      let chatBoxElement = document.querySelector(settings.selectors.chatBox);
      let previousLatest = chatBoxElement.querySelectorAll((isUser ?
          settings.selectors.fromUser : settings.selectors.fromWatson) +
        settings.selectors.latest);
      // Previous "latest" message is no longer the most recent
      if (previousLatest) {
        Common.listForEach(previousLatest, function(element) {
          element.classList.remove('latest');
        });
      }

      messageDivs.forEach(function(currentDiv) {
        chatBoxElement.appendChild(currentDiv);
        // Class to start fade in animation
        currentDiv.classList.add('load');
      });
      // Move chat to the most recent messages when new messages are added
      scrollToChatBottom();
    }
  }

  // Checks if the given typeValue matches with the user "name", the Watson "name", or neither
  // Returns true if user, false if Watson, and null if neither
  // Used to keep track of whether a message was from the user or Watson
  function isUserMessage(typeValue) {
    if (typeValue === settings.authorTypes.user) {
      return true;
    } else if (typeValue === settings.authorTypes.watson) {
      return false;
    }
    return null;
  }

  // Constructs new DOM element from a message payload
  function buildMessageDomElements(newPayload, isUser) {
    let textArray = isUser ? newPayload.input.text : newPayload.output.text;
    if (Object.prototype.toString.call(textArray) !== '[object Array]') {
      textArray = [textArray];
    }
    let messageArray = [];

    textArray.forEach(function(currentText) {
      if (currentText) {
        let messageJson = {
          // <div class='segments'>
          'tagName': 'div',
          'classNames': ['segments'],
          'children': [{
            // <div class='from-user/from-watson latest'>
            'tagName': 'div',
            'classNames': [(isUser ? 'from-user' : 'from-watson'), 'latest', ((messageArray.length === 0) ? 'top' : 'sub')],
            'children': [{
              // <div class='message-inner'>
              'tagName': 'div',
              'classNames': ['message-inner'],
              'children': [{
                // <p>{messageText}</p>
                'tagName': 'p',
                'text': currentText
              }]
            }],
          }]
        };
        messageArray.push(Common.buildDomElement(messageJson));
      }
    });
    return messageArray;
  }

  // Scroll to the bottom of the chat window (to the most recent messages)
  // Note: this method will bring the most recent user message into view,
  //   even if the most recent message is from Watson.
  //   This is done so that the "context" of the conversation is maintained in the view,
  //   even if the Watson message is long.
  function scrollToChatBottom() {
    let scrollingChat = document.querySelector('#scrollingChat');

    // Scroll to the latest message sent by the user
    let scrollEl = scrollingChat.querySelector(settings.selectors.fromUser +
      settings.selectors.latest);
    if (scrollEl) {
      scrollingChat.scrollTop = scrollEl.offsetTop;
    }
  }
  // Handles the submission of input
  function inputKeyDown(event, inputBox) {
    // Submit on enter key, dis-allowing blank messages
    if (event.keyCode === 13 && inputBox.value || event.type == 'click' && inputBox.value) {
      // Retrieve the context from the previous server response
      let context;
      let latestResponse = Api.getResponsePayload();
      if (latestResponse) {
        context = latestResponse.context;
      }

      // Send the user message
      Api.sendRequest(inputBox.value, context);

      // Clear input box for further messages
      inputBox.value = '';
      Common.fireEvent(inputBox, 'input');
    }
  }
}());
