/*
 * Javascript with Cylon version of Tiburoncin, my sumobot
 * Six wheeled robot with a front end loader, controlled with an USB Snes controller
 * - Arduino *
 * - 6 Continuous servo for the wheels
 * - 2 servo for the loader
 * - 1 HC-06 Bluetooth
 *   HC-06 Connections:
 *   BT       Arduino
 *   RX ----> 11
 *   TX ----> 10
 */


var Cylon = require('cylon');
var config = __dirname + "/snes.json"

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1421' },
    // arduino: { adaptor: 'firmata', port: '/dev/tty.SoccerBot-DevB' },
    joystick: { adaptor: 'joystick' }
  },

  devices: {
    // wheels
    servol1: { driver: 'continuous-servo', pin: 3, connection: 'arduino'},
    servol2: { driver: 'continuous-servo', pin: 4, connection: 'arduino'},
    servol3: { driver: 'continuous-servo', pin: 5, connection: 'arduino'},
    servor1: { driver: 'continuous-servo', pin: 6, connection: 'arduino'},
    servor2: { driver: 'continuous-servo', pin: 7, connection: 'arduino'},
    servor3: { driver: 'continuous-servo', pin: 8, connection: 'arduino'},

    // a loader like this: https://www.deere.com/en_US/media/images/product/construction/wheel_loaders/524k_it4/474866_524k_it4_642x462.png
    leftLoader: { driver: 'continuous-servo', pin: 9, connection: 'arduino' },
    rigthLoader: { driver: 'continuous-servo', pin: 10, connection: 'arduino' },

    // a usb snes controller, to control the robot
    controller: { driver: "joystick", config: config, connection: 'joystick' }
  },

  work: function(my) {

    my.loaderDown();

    // b buttons stop the bot
    my.controller.on("b:press", function() {
        my.stop();
    });

    my.controller.on("r:press", function() {
        my.loaderUp();
    });

    my.controller.on("l:press", function() {
        my.loaderDown();
    });

    // x is the `x` axis
    my.controller.on("x:move", function(pos) {
      if (pos === -1) {
        my.forward();
      } else if (pos === 1) {
        my.backward();
      }
    });

    // y is the `y` axis
    my.controller.on("y:move", function(pos) {
      if (pos === -1) {
        my.left();
      } else if (pos === 1) {
        my.right();
      }
    });
  },

  left: function() {
    console.log('Left');
    this.servol1.counterClockwise();
    this.servol2.counterClockwise();
    this.servol3.counterClockwise();
    this.servor1.counterClockwise();
    this.servor2.counterClockwise();
    this.servor3.counterClockwise();
  },

  right: function() {
    console.log('Right');
    this.servol1.clockwise();
    this.servol2.clockwise();
    this.servol3.clockwise();
    this.servor1.clockwise();
    this.servor2.clockwise();
    this.servor3.clockwise();
  },

  forward: function() {
    console.log('Forward');
    this.servol1.clockwise();
    this.servol2.clockwise();
    this.servol3.clockwise();
    this.servor1.counterClockwise();
    this.servor2.counterClockwise();
    this.servor3.counterClockwise();
  },

  backward: function() {
    console.log('Backward');
    this.servol1.counterClockwise();
    this.servol2.counterClockwise();
    this.servol3.counterClockwise();
    this.servor1.clockwise();
    this.servor2.clockwise();
    this.servor3.clockwise();
  },

  stop: function() {
    console.log('Stop');
    this.servol1.stop();
    this.servol2.stop();
    this.servol3.stop();
    this.servor1.stop();
    this.servor2.stop();
    this.servor3.stop();
  },

  loaderUp: function() {
    this.leftLoader.angle(135);
    this.rightLoader.angle(45);
  },

  loaderDown: function() {
    this.leftLoader.angle(45);
    this.rightLoader.angle(135);
  }

}).start();
