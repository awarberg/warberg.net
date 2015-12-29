import * as ko from 'knockout';

export class viewModel {
  constructor() {
    this.page = ko.observable(window.location.pathname.replace(/\/$/, ''));
  }
}

export {
  default as template
}
from './shared-header.html';