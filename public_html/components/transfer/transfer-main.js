import * as ko from 'knockout';
import * as _ from 'underscore';
import * as $ from 'jquery';
import {
  parseQueryString
}
from 'helpers';

const pendingxhr = [];

function ajax(settings) {
  let xhr = $.ajax(settings);
  pendingxhr.push(xhr);
  return xhr;
}

function ajaxAbort() {
  pendingxhr.forEach(xhr => xhr.abort());
  pendingxhr.length = 0;
}

function waitForReceiver(transfer) {
  const dfd = $.Deferred();
  let pingRequest;
  const pingInterval = setInterval(() => {
    if (pingRequest && pingRequest.state() === 'pending') {
      return;
    }
    pingRequest = ajax({
        type: 'GET',
        url: '/cgi-bin/transfer/ping.php?key=' + transfer.publicKey
      })
      .done((response, textStatus) => {
        if (textStatus === 'success') {
          clearInterval(pingInterval);
          dfd.resolve(transfer);
        }
      })
      .fail(error => abort(error));
  }, 5000);

  function abort(message) {
    clearInterval(pingInterval);
    dfd.reject(message);
  }
  transfer.abort.subscribe(abortToken => abort(abortToken.reason));
  return dfd.promise();
}

export class viewModel {
  constructor() {
    this.submitButtonText = ko.pureComputed(() =>
      this.transfer() ? 'Cancel' : (this.mode() === 'send' ? 'Send' : this.mode() === 'receive' ? 'Receive' : 'N/A'));

    this.submitButtonDisabled = ko.observable();
    const queryParams = parseQueryString();
    this.mode = ko.observable(queryParams.mode || 'send');
    this.publicKey = ko.observable(queryParams.key || '');
    this.status = ko.observable();
    this.transfer = ko.observable();
    this.reset();
  }
  toggleSend() {
    this.mode('send');
  }
  toggleReceive() {
    this.mode('receive');
  }
  reset() {
    ajaxAbort();
    this.submitButtonDisabled(false);
    this.status('');
    this.transfer(undefined);
  }
  startSend(form) {
    let transfer = this.transfer();
    if (transfer) {
      this.reset();
      transfer.abort({
        reason: 'Cancelled by user'
      });
      this.transfer(undefined);
      return;
    }
    this.submitButtonDisabled(true);
    const receiverEmail = form.email.value;
    transfer = {
      receiverEmail: receiverEmail,
      abort: ko.observable(undefined)
    };
    this.transfer(transfer);
    $.ajax({
        type: 'POST',
        url: '/cgi-bin/transfer/start.php',
        data: {
          'receiverEmail': receiverEmail
        }
      })
      .then(publicKey => {
        console.log('publicKey', publicKey);
        this.submitButtonDisabled(false);
        this.status('Waiting for ' + receiverEmail + '...');
        let transfer = this.transfer();
        transfer.publicKey = publicKey;
        return waitForReceiver(transfer);
      })
      .then(transfer => {
        this.status('Uploading file to ' + transfer.receiverEmail + '...');
        let file = form.file.files[0];
        return ajax({
          type: 'PUT',
          url: '/cgi-bin/transfer/send.php?key=' + transfer.publicKey,
          contentType: 'application/octet-stream',
          data: file,
          headers: {
            'X-Warberg-Filename': file.name
          },
          processData: false
        });
      })
      .done(() => {
        let transfer = this.transfer();
        this.reset();
        this.status('File received by ' + transfer.receiverEmail);
      })
      .fail(error => {
        this.status('File not sent: ' + error);
      });
  }
  startReceive(form) {
    const publicKey = form.publicKey.value;
    const receiveUrl = '/cgi-bin/transfer/receive.php?key=' + publicKey;
    window.open(receiveUrl, '_blank');
  }
}

export {
  default as template
}
from './transfer-main.html';