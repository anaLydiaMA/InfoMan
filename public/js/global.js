(function() {

  // Initialize all modules
  ConversationPanel.init();
  $('.bx--loading-overlay').hide();

  //Sends requests to server when user clicks on buttons
  $('#scrollingChat').on('click', '.actionButton', function() {
    let latestResponse = Api.getResponsePayload();
    let context = latestResponse.context;
    let response = this.innerText;
    Api.sendRequest(response, context);
  });

  //Initializes the Date Picker on dynamic loading
  $(document).bind("DOMSubtreeModified", function() {
    CarbonComponents.settings.disableAutoInit = true;
    CarbonComponents.DatePicker.init();
  });

  //Sends HTTP request on date submition
  $('#scrollingChat').on('click', '.submitDate', function() {
    let data = $('.bx--date-picker__input').val();
    if (data == "") {
      alert('Please enter a valid date')
    } else {
      //Get date values
      let fromDate = Date.parse($('.fromDate').val()) / 1000;
      let toDate = Date.parse($('.toDate').val()) / 1000;

      //POST request to server
      $.ajax({
        type: "POST",
        url:'/api/submit',
        data: {fromDate: fromDate, toDate: toDate},
        success: function(data) {
          // alert('Data successfully submitted');
          console.log('Successfully sent data.');
          Api.sendRequest('Changes have been made', '');
        },
        error: function(error) {
          alert('Sorry, there was an error in processing the data')
          console.log(error);
        }
      })
    }
  });

  //Opens modal
  $('#scrollingChat').on('click', '.modalButton', function() {
    let text = $('.hide').text();
    $('.redirect').attr({
      href: text,
      target: '_blank'
    });
  });

  //Closes modal
  $('#scrollingChat').on('click', '.cancel', function() {
    CarbonComponents.Modal.hide();
  });

  //Sends HTTP request on date submition
  $('#submitFeedback').on('click', function(e) {
    e.preventDefault();
    let question = $('#question').val();
    let informationToGet = $('#informationToGet').val();
    let comments = $('#comments').val();
    console.log(question, informationToGet, comments)
    if (question == "" || informationToGet == "") {
      alert('Please complete the required fields')
    } else {
      //POST request to server
      $.ajax({
        type: "POST",
        url: '/api/feedback',
        data: {
          question: question,
          informationToGet: informationToGet,
          comments: comments
        },
        success: function(data) {
          // alert('Data successfully submitted');
          Api.sendRequest(data, '');
          $('#feedbackModal').toggle();
          console.log('Successfully sent: ' + data);
        },
        error: function(error) {
          alert('There was an erorr in your request. Please try again')
          console.log(error);
        }
      });
    }
  });

  $('#unhelpful').on('click', function(){
    $('#feedbackModal').toggle();
  })
})();
