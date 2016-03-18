/*
 * The first implementation of Tiburoncin, with two DC motors and H bridge and controlled with the keyboard
 * The board can be controlled with an usb cable or Bluetooth
 * Drives a differential drive robot composed by:
 * - Arduino *
 * - L298N Dual H-bridge DC Motor Driver Shield
 * - HC-06 Bluetooth
 *   HC-06 Connections:
 *   BT       Arduino
 *   RX ----> TX
 *   TX ----> RX
 */

'use strict';

var five = require('johnny-five');
var keypress = require('keypress');

// var board = new five.Board({port: '/dev/ttyATH0'});
var board = new five.Board({port: '/dev/tty.SoccerBot-DevB'});
// var board = new five.Board({port: '/dev/tty.wchusbserial1420'});
// var board = new five.Board();

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

    } else if ( key.name === 'down' ) {

      console.log('Backward');
      leftWheel.reverse(255);
      rightWheel.reverse(255);

    } else if ( key.name === 'left' ) {

      console.log('Left');
      leftWheel.stop();
      rightWheel.forward(255);


    } else if ( key.name === 'right' ) {

      console.log('Right');
      leftWheel.forward(255);
      rightWheel.stop();

    } else if ( key.name === 'space' ) {

      console.log('Stopping');
      leftWheel.stop();
      rightWheel.stop();

    }
  });
});
