'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('../config')
const mqttTTN = require('./mqttTTN')

mongoose.connect(config.db, (err, res) => {

  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida...')

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
      mqttTTN.setMqttConnection(()=>{
          mqttTTN.setTopic('nodo1');
          mqttTTN.setTopic('nodo2');
          mqttTTN.setTopic('nodo3');
          mqttTTN.setTopic('nodo4');
          mqttTTN.setTopic('nodo5');
      })
  })
})
