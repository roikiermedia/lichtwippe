var esp = require("ESP8266");

var pin = new Pin(NodeMCU.D6);
pinMode(pin, "output");

var striplength = 120;

var pixel = [
//G,R,B
  0,0,0, // LED 0
  0,0,0, // LED 1
  0,0,0, // LED 2
];

var i = 0;
setInterval(function() {
  pixel[i*3] = 50;
  pixel[i*3+1] = 50;
  pixel[i*3+2] = 50;

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