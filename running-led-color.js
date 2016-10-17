var esp = require("ESP8266");
var mpu = require("MPU6050");

var pin = new Pin(NodeMCU.D6);
pinMode(pin, "output");

var striplength = 120;

var pixel = [
//G,R,B
  0,0,0, // LED 0
  0,0,0, // LED 1
  0,0,0, // LED 2
];
  
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var i = 0;
setInterval(function() {
  pixel[i*3] = getRandomInt(25, 249);
  pixel[i*3+1] = getRandomInt(25, 249);
  pixel[i*3+2] = getRandomInt(25, 249);

  if (i !== 0) {
    pixel[(i-1)*3] = 0;
    pixel[(i-1)*3+1] = 0;
    pixel[(i-1)*3+2] = 0;
  }
else {
  pixel[(striplength-1)*3] = 0;
  pixel[(striplength-1)*3+1] = 0;
  pixel[(striplength-1)*3+2] = 0;
}

  esp.neopixelWrite(pin, pixel);
  if (i < (striplength + 1)) {i++;}
  else {i = 0;}
},1000/120);