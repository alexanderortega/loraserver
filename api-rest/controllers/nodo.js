'use strict'

const Nodo = require('../models/nodo')

function saveNodo (message, next){
  var messageObject = JSON.parse(message);
  var appId = messageObject.app_id
  var devId = messageObject.dev_id

  console.log(appId,devId)

  var nodo = new Nodo({
      app_id: appId,
      dev_id: devId
  })

  // Compruebo si existe el nodo
  // Si no existe crea uno nuevo
  Nodo.find({dev_id: messageObject.dev_id},(err, nodos) =>{
    if (err) console.log({message: `Error al actualizar el producto: ${err}`})
    if(nodos.length == 0){
      nodo.save((err, nodoStored) => {
        if(err) console.log({message: `Error al salvar en la base de datos: ${err}`})
        console.log(nodoStored)
        next();
      })
    }else{
      next();
    }
  })
}

function pushData(message){
  var messageObject = JSON.parse(message);

  Nodo.findOneAndUpdate({dev_id: messageObject.dev_id},  { $push: { data: messageObject } }, (err, nodoUpdated) =>{
    if (err) console.log({message: `Error al actualizar el producto: ${err}`})
    console.log({ nodo: nodoUpdated })
  } )


/*
  data.forEach((obj, iData) => {
      var gateways = obj.metadata.gateway
      gateways.forEach((gateway, iGateway) => {
          console.log('mensaje #: ' + iData,'gateway: ' + gateway.gtw_id ,'con RSSI = ' +gateway.rssi)
      });
  });
  */

}

function getNodo (req, res) {
  let dev_id = req.params.nodoId

  Nodo.findOne({dev_id: dev_id}, (err, nodo) => {
    if (err) res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!nodo) return res.status(404).send({message: `El Nodo no existe`})
    res.status(200).send({nodo: nodo })
  })

}

module.exports = {
  saveNodo,
  pushData,
  getNodo
}
