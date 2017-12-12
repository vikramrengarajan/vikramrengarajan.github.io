$(document).ready(function(){

  Parse.initialize("4ha3VnsLctsgacA5t2whwPP4UC3zHwmI1w2gJYTH", "U02N3l4D7T0PlDlUBSLKcj0umzdLgUvXSP8zPDWB");

  $('#send-message').on('click', function () {
    $(this).button('loading');
  })

  var validator = $('#contact-form').validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true
      }
    },
    highlight: function (element) {
      $(element).closest('.form-group').removeClass('success').addClass('error');
      $('#send-message').button('reset');
    },
    success: function (element) {
      element.text('OK!').addClass('valid').closest('.form-group').removeClass('error').addClass('success');
    },
    submitHandler: function(form) {
      var data = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val()
      }

      Parse.Cloud.run("sendMail", data, {
        success: function(object) {
          form.reset();
          $('#send-message').button('reset');
          console.log("Sent");
        },
        error: function(object, error) {
          console.log("Error" + error);
        }
      });
    }
  });
});
