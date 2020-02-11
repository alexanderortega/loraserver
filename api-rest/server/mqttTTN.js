'use strict'

var mqtt = require ('mqtt');
var options = {
    username: 'prueba_de_cobertura_udenar',
    password: 'ttn-account-v2.u7s8yyj4bVW7AO95VlKJO7nZFsVFKn7bSsJoe77YDWs'
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
    client.subscribe(`prueba_de_cobertura_udenar/devices/${deviceId}/up`, function() {console.log('Suscrito a ',deviceId)});
}

module.exports = {
  setMqttConnection,
  setTopic
}
