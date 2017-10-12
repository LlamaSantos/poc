var EventEmitter2 = require('eventemitter2').EventEmitter2;

var e = new EventEmitter2({
  delimiter: '::',
  wildcard: true,
});

module.exports = e;
