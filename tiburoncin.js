/*
 * Javascript with Johnny-Five version of Tiburoncin, my sumobot
 * Four wheeled robot, controlled with the keyboard
 * - Arduino *
 * - 2 dc motors for the wheels
 * - 2 servo for the wheels, yes servos and dc motors mixed, i needed power and I used what I had
 * Here Tiburoncin is the winner https://youtu.be/Q0b7LAvh9lE?t=80
 */

'use strict';

var five = require('johnny-five');
var keypress = require('keypress');

// var board = new five.Board({port: '/dev/ttyATH0'});
var board = new five.Board();

board.on('ready', function() {

  console.log('Welcome to Tiburoncin!');
  console.log('Control the bot with the arrow keys, and SPACE to stop.');

  // A
  var leftWheel = new five.Motor({
    pins: {pwm: 6, dir: 4, cdir: 7}
  });

  // B
  var rightWheel = new five.Motor({
    pins: {pwm: 5, dir: 2, cdir: 3}
  });

  var leftWheelS = new five.Servo({ pin: 11, type: 'continuous' }).stop();
  var rightWheelS = new five.Servo({ pin: 10, type: 'continuous' }).stop();

  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function (ch, key) {

    if ( !key ) { return; }

    if ( key.name === 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name === 'up' ) {

      console.log('Forward');
      leftWheel.forward(255);
      rightWheel.forward(255);
      leftWheelS.cw(1);
      rightWheelS.ccw(1);

    } else if ( key.name === 'down' ) {

      console.log('Backward');
      leftWheel.reverse(255);
      rightWheel.reverse(255);
      leftWheelS.ccw(1);
      rightWheelS.cw(1);

    } else if ( key.name === 'left' ) {

      console.log('Left');
      leftWheel.reverse(200);
      rightWheel.forward(200);
      leftWheelS.ccw(1);
      rightWheelS.ccw(1);


    } else if ( key.name === 'right' ) {

      console.log('Right');
      leftWheel.forward(200);
      rightWheel.reverse(200);
      leftWheelS.cw(1);
      rightWheelS.cw(1);

    } else if ( key.name === 'space' ) {

      console.log('Stopping');
      leftWheel.stop();
      rightWheel.stop();
      leftWheelS.stop();
      rightWheelS.stop();

    }
  });
});
