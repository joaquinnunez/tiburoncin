/* A easy to implement bot to share the fan with your colleague
 * https://www.youtube.com/watch?v=rQcxvNmRe-c
 */

'use strict';

var five = require('johnny-five');

var board = new five.Board({port: '/dev/ttyATH0'});

board.on('ready', function() {

  console.log('Welcome to Fanbot!');

  // A
  var leftWheel = new five.Motor({
    pins: {pwm: 6, dir: 4, cdir: 7}
  });

  // B
  var rightWheel = new five.Motor({
    pins: {pwm: 5, dir: 2, cdir: 3}
  });

  function stop() {
    console.log('Stopping');
    leftWheel.stop();
    rightWheel.stop();
  }

  function right() {
    console.log('Right');
    leftWheel.forward(200);
    rightWheel.reverse(200);
    setTimeout(stop, 350);
    setTimeout(left, 5000);
  }

  function left() {
    console.log('Left');
    leftWheel.reverse(200);
    rightWheel.forward(200);
    setTimeout(stop, 350);
    setTimeout(right, 5000);
  }

  setTimeout(right, 5000);
});
