/*jslint indent:2*/
/*global require:true, console:true, process:true, setInterval:true*/

(function () {
  'use strict';

  process.env.DEBUG = '*';

  var diehard = require('../');

  setInterval(function () {
    console.log('Both cleanup handlers will be called!');
  }, 250);

  // synchronous handlers
  diehard.register(function () {
    console.log('cleanup #1');
  });

  // async handlers
  diehard.register(function (done) {
    console.log('cleanup #2');
    process.nextTick(done);
  });

  diehard.listen();

  setTimeout(function () {
    process.kill(process.pid, 'SIGINT');
  }, 1000);

}());

