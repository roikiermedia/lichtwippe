var esp = require("ESP8266");
I2C1.setup({scl:NodeMCU.D3,sda:NodeMCU.D4});
var mpu = require("MPU6050").connect(I2C1);

// led-strip
var pin = new Pin(NodeMCU.D6);
pinMode(pin, "output");
var striplength = 120;
var pixel = [
//G,R,B
  0,0,0, // LED 0
  0,0,0 // LED 1... and so on
];
function showPixel(location, lastLocation) {
  // turn off last pixel
  if (lastlocation !== undefined) {
    pixel[lastLocation*3] = 0;
    pixel[lastLocation*3+1] = 0;
    pixel[lastLocation*3+2] = 0;
  }
  // turn on new pixel
  pixel[location*3] = 255;
  pixel[location*3+1] = 255;
  pixel[location*3+2] = 255;
  // write pixel data to strip
  esp.neopixelWrite(pin, pixel);
}


// physics simulation
var light = {
  location: 0,
  accel: 0,
  veloc: 0,
  // mass can't be 0
  mass: 1
};
function updateLight() {
  // grav[x,y,z]
  var grav = mpu.getGravity();
  // get ms^2 from g and factor in mass
  gravity = (grav[1] * 9.81) / mass;

  light.accel = gravity;
  light.veloc = light.veloc + light.accel;
  light.location = light.location + light.veloc;
  light.accel = 0;
  // round location to whole pixel
  light.location = Math.round(light.location);
}


// frame cycle
var fps = 30;
setInterval(function() {

  esp.neopixelWrite(pin, pixel);
},1000/fps);