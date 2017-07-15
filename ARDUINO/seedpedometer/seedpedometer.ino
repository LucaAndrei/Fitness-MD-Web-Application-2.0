#include <SoftwareSerial.h>

// Arduino Wire library is required if I2Cdev I2CDEV_ARDUINO_WIRE implementation
// is used in I2Cdev.h
#include "Wire.h"

// I2Cdev and ADXL345 must be installed as libraries, or else the .cpp/.h files
// for both classes must be in the include path of your project
#include "I2Cdev.h"
#include "ADXL345.h"

#define MAX_AXIS                3
#define MAX_WINDOW              3
#define SAMPLING_MODEL_NUMBER   60
#define MODEL_STANDARD_VALUE    20

enum Axis{
    X_AXIS = 0,
    Y_AXIS = 1,
    Z_AXIS = 2,
};

Axis _model_axis;
    int _model_val;
    int _curr_val;   
    int _model_ratio;
int _last_val;

uint16_t stepCount;

SoftwareSerial BT(2, 3);
ADXL345 accel;
int16_t ax, ay, az;

void setup() {
  // join I2C bus (I2Cdev library doesn't do this automatically)
  Wire.begin();

  Serial.begin(9600);
  Serial.println("Hello from Serial");

  

  BT.begin(9600); // set the data rate for the BT port

  sensorInit();
  stepCount = 0;
  updateModelAxis();
  _curr_val = 0;
}

void sensorInit() {

  // initialize device
  Serial.println("Initializing I2C devices...");
  accel.initialize();

  // verify connection
  Serial.println("Testing device connections...");
  Serial.println(accel.testConnection() ? "ADXL345 connection successful" : "ADXL345 connection failed");
  
  //set activity/ inactivity thresholds (0-255)
  accel.setActivityThreshold(75); //62.5mg per increment
  accel.setInactivityThreshold(75); //62.5mg per increment
  accel.setInactivityTime(10); // how many seconds of no activity is inactive?
 
  //look of activity movement on this axes - 1 == on; 0 == off 
  accel.setActivityXEnabled(true);
  accel.setActivityYEnabled(true);
  accel.setActivityZEnabled(true);
 
  //look of inactivity movement on this axes - 1 == on; 0 == off
  accel.setInactivityXEnabled(true);
  accel.setInactivityYEnabled(true);
  accel.setInactivityZEnabled(true);
 
  //look of tap movement on this axes - 1 == on; 0 == off
  //accel.setTapDetectionOnX(0);
  //accel.setTapDetectionOnY(0);
  //accel.setTapDetectionOnZ(1);
 
  //set values for what is a tap, and what is a double tap (0-255)
  accel.setTapThreshold(50); //62.5mg per increment
  accel.setTapDuration(15); //625us per increment
  accel.setDoubleTapLatency(80); //1.25ms per increment
  accel.setDoubleTapWindow(200); //1.25ms per increment
 
  //set values for what is considered freefall (0-255)
  accel.setFreefallThreshold(7); //(5 - 9) recommended - 62.5mg per increment
  accel.setFreefallTime(45); //(20 - 70) recommended - 5ms per increment
 
  //setting all interrupts to take place on int pin 1
  //I had issues with int pin 2, was unable to reset it
  /*accel.setInterruptMapping( ADXL345_INT_SINGLE_TAP_BIT,   ADXL345_INT1_PIN );
  accel.setInterruptMapping( ADXL345_INT_DOUBLE_TAP_BIT,   ADXL345_INT1_PIN );
  accel.setInterruptMapping( ADXL345_INT_FREE_FALL_BIT,    ADXL345_INT1_PIN );
  accel.setInterruptMapping( ADXL345_INT_ACTIVITY_BIT,     ADXL345_INT1_PIN );
  accel.setInterruptMapping( ADXL345_INT_INACTIVITY_BIT,   ADXL345_INT1_PIN );*/
 
  //register interrupt actions - 1 == on; 0 == off  
 /* accel.setInterrupt( ADXL345_INT_SINGLE_TAP_BIT, 1);
  accel.setInterrupt( ADXL345_INT_DOUBLE_TAP_BIT, 1);
  accel.setInterrupt( ADXL345_INT_FREE_FALL_BIT,  1);
  accel.setInterrupt( ADXL345_INT_ACTIVITY_BIT,   1);
  accel.setInterrupt( ADXL345_INT_INACTIVITY_BIT, 1);*/
}

void updateModelAxis()
{
  Serial.println("updateModelAxis");
    int x,y,z;
    int16_t sum[MAX_AXIS] = {0};
    for(int i = 0; i < SAMPLING_MODEL_NUMBER; i++){
        accel.getAcceleration(&x, &y, &z);   
        sum[X_AXIS] += abs(x);
        sum[Y_AXIS] += abs(y);
        sum[Z_AXIS] += abs(z);
        Serial.print("x : "); Serial.println(x);
        Serial.print("y : "); Serial.println(y);
        Serial.print("z : "); Serial.println(z);
    }
    sum[X_AXIS] /= SAMPLING_MODEL_NUMBER;
    sum[Y_AXIS] /= SAMPLING_MODEL_NUMBER;
    sum[Z_AXIS] /= SAMPLING_MODEL_NUMBER;
    
    Serial.print("sum[X_AXIS] : "); Serial.println(sum[X_AXIS]);
    Serial.print("sum[Y_AXIS] : "); Serial.println(sum[Y_AXIS]);
    Serial.print("sum[Z_AXIS] : "); Serial.println(sum[Z_AXIS]);
    
    _model_axis = sum[X_AXIS] >= sum[Y_AXIS]?X_AXIS:Y_AXIS;
    _model_axis = sum[_model_axis] >= sum[Z_AXIS]?_model_axis:Z_AXIS;
    Serial.print("Model axis : "); Serial.println(_model_axis);
    _model_val = sum[_model_axis];
    Serial.print("_model_val : "); Serial.println(_model_val);
    
    _model_ratio = (_model_val+MODEL_STANDARD_VALUE/2)/MODEL_STANDARD_VALUE;
    Serial.print("_model_ratio : "); Serial.println(_model_ratio);
}

void loop() {
  stepCalc();
}

void getValue()
{
  //Serial.println("getValue()");
    int tmp_val[MAX_AXIS];
    _curr_val = 0;
    for(int i = 0; i < MAX_WINDOW; i++){
        accel.getAcceleration(&tmp_val[X_AXIS], &tmp_val[Y_AXIS], &tmp_val[Z_AXIS]);  
        _curr_val += abs(tmp_val[_model_axis]);
    }
    _curr_val /= MAX_WINDOW;
    _curr_val = (_curr_val + _model_ratio/2)/_model_ratio;
    //Serial.print("_curr_val : "); Serial.println(_curr_val);
}

void getValidValue()
{    
    do{
        getValue(); 
    }while((abs(_curr_val-_model_val) <= 2) || (_curr_val == _last_val));

    _last_val = _curr_val;
}


void stepCalc()
{
  //Serial.println("stepCalc()");
    unsigned long timerStart,timerEnd;
    timerStart = millis();
    timerEnd = 100 + timerStart;//one step is more than 100ms
    getValidValue();
    //Serial.print("first valid value _curr_val: "); Serial.println(_curr_val);
    if(_curr_val >= 23){
        while(1){
            getValidValue();  
            //Serial.print("second valid value _curr_val : "); Serial.println(_curr_val);
            if(_curr_val <= 17){
                if(millis() > timerEnd) {
                    stepCount++;
                    BT.write(1);
                    Serial.print("!@#!@#!@#!@!@#!@#!@#stepCount : "); Serial.println(stepCount);
                }
                break;
            }
        }
    }
}
