import * as _ from 'underscore';

export function parseQueryString(queryString = window.location.search) {
  return (_.last(queryString.split('?')) || '')
    .split('&')
    .map(kvpStr => kvpStr.split('='))
    .reduce((params, kvp) => {
      params[kvp[0]] = decodeURIComponent(kvp[1]);
      return params;
    }, {});
}