'use strict'

var mqtt = require ('mqtt');
var options = {
    username: 'b1j9j9i8e4g6f5c2b1',
    password: 'ttn-account-v2.Qu0YFpSZUDxScF0ZqvmonxungzV-vMVsyIrSYWXwoVM'
};

var client = mqtt.connect('mqtt://us-west.thethings.network:1883',options);

const NodoCtrl = require('../controllers/nodo')


function setMqttConnection(next){
  client.on('connect', function() { // When connected
      console.log('connected');
      client.on('message', function(topic, message, packet) {
          var messageObject = JSON.parse(message);

          NodoCtrl.saveNodo(message, ()=>{
              NodoCtrl.pushData(message);
          });

      });
      next();
  });
}

function setTopic(deviceId){
    client.subscribe(`b1j9j9i8e4g6f5c2b1/devices/${deviceId}/up`, function() {console.log('Suscrito a ',deviceId)});
}

module.exports = {
  setMqttConnection,
  setTopic
}
