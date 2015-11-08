define(['knockout', 'text!./main.html'], function(ko, template) {
  function Transfer() {
    this.startTransfer = function(form) {
      var startTransferRequest = $.ajax({
        type: 'POST',
        url: '/cgi-bin/transfer/start.php',
        data: {
          'receiverEmail': form['email'].value
        }
      });
      startTransferRequest.done(function(publicKey){
        console.log("waiting for receiver... publicKey = " + publicKey);
        var pollReceiverInterval = setInterval(function(){
          var file = form['file'].files[0];
          var sendFileRequest = $.ajax({
            type: 'PUT',
            url: '/cgi-bin/transfer/send.php?key=' + publicKey,
            contentType: 'application/octet-stream',
            data: file,
            headers: {'X-Filename': file.name},
            processData: false
          });
          sendFileRequest.done(function(response, textStatus){
            if(textStatus === 'nocontent'){
              // Waiting
            } else {
              console.log('File sent');
              clearInterval(pollReceiverInterval);
            }
          });
          sendFileRequest.fail(function(){
            console.log('File not sent');
            clearInterval(pollReceiverInterval);
          });
        }, 5000);
      });
    };
  }
  return {
    viewModel: Transfer,
    template: template
  };
});