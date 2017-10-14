// Generated by CoffeeScript 1.8.0
(function() {
  var Promise, delayed, p, promised_delay, stop;

  Promise = require("bluebird");

  p = console.log;

  stop = function(time) {
    time = time || 500;
    return setTimeout(process.exit, time);
  };

  delayed = function(time, callback) {
    var bar, err;
    time = time || Math.random() * 500;
    err = null;
    if (time > 600) {
      err = time;
    }
    bar = function() {
      p('bar ', time);
      return callback(err, time);
    };
    return setTimeout(bar, time);
  };

  promised_delay = Promise.promisify(delayed);

  promised_delay(800).then(function(what) {
    p(11);
    return 1;
  }).then(function(what) {
    p('2  ', what);
    return 2;
  })["catch"](function(e) {
    return p('e ', e);
  });

}).call(this);