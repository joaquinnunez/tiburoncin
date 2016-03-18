/*
 * Another code for Tiburoncin, my sumobot (this time is Arduino Language)
 * Six wheeled robot with a front end loader.
 * - Arduino *
 * - 6 Continuous servo for the wheels
 * - 2 servo for the loader
 * - 1 HC-06 Bluetooth
 *   HC-06 Connections:
 *   BT       Arduino
 *   RX ----> 11
 *   TX ----> 10
 * Tested with an android device and this app https://play.google.com/store/apps/details?id=appinventor.ai_test.BluetoothRC&hl=es_419
 */

#include <Servo.h>
#include <SoftwareSerial.h>

Servo servol1;
Servo servol2;
Servo servol3;
Servo servor1;
Servo servor2;
Servo servor3;
Servo leftLoader;
Servo rightLoader;
SoftwareSerial mySerial(10, 11); // TX, RX

void setup() {
 Serial.begin(9600);
 mySerial.begin(9600);

 // configure pins
 servol1.attach(2);
 servol2.attach(3);
 servol3.attach(4);
 servor1.attach(5);
 servor2.attach(6);
 servor3.attach(7);
 leftLoader.attach(8);
 rightLoader.attach(9);

 // stop the servos
 stop();
 // put down the loader
 loaderDown();

}

void loop() {
  if (mySerial.available()) {
    char c = mySerial.read();
    Serial.println(c);
    switch(c) {
      case 'L':
        left();
        break;
      case 'R':
        right();
        break;
      case 'F':
        forward();
        break;
      case 'B':
        backward();
        break;
      case 'X': // X
        stop();
        break;
      case 'S': // Square
        loaderUp();
        break;
      case 'O': // Circle
        loaderDown();
        break;
      case 'D': // Triangle
        break;
    }
  }
}

void forward() {
  Serial.println("Forward");
  servol1.write(0);
  servol2.write(0);
  servol3.write(0);
  servor1.write(0);
  servor2.write(0);
  servor3.write(0);
}

void backward() {
  Serial.println("Backward");
  servol1.write(180);
  servol2.write(180);
  servol3.write(180);
  servor1.write(180);
  servor2.write(180);
  servor3.write(180);
}

void left() {
  Serial.println("Left");
  servol1.write(90);
  servol2.write(90);
  servol3.write(90);
  servor1.write(0);
  servor2.write(0);
  servor3.write(0);
}

void right() {
  Serial.println("Right");
  servol1.write(0);
  servol2.write(0);
  servol3.write(0);
  servor1.write(90);
  servor2.write(90);
  servor3.write(90);
}

void stop() {
  Serial.println("Stop");
  servol1.write(90);
  servol2.write(90);
  servol3.write(90);
  servor1.write(90);
  servor2.write(90);
  servor3.write(90);
}

void loaderUp() {
  Serial.println("LoaderUp");
  leftLoader.write(135);
  rightLoader.write(45);
}

void loaderDown() {
  Serial.println("LoaderDown");
  leftLoader.write(45);
  rightLoader.write(135);
}
