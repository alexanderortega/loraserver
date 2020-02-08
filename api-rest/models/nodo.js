'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NodoSchema = Schema({
  app_id: String,
  dev_id: String,
  data: [{
    hardware_serial: String,
    port: Number,
    counter: Number,
    is_retry: Boolean,
    confirmed: Boolean,
    payload_raw: String,
    payload_fields: {},
    metadata: {
        airtime: Number,
        time: Date,
        frequency: Number,
        modulation: String,
        data_rate: String,
        big_rate: Number,
        coding_rate: String,
        gateways: [{
            gtw_id: String,
            timestamp: Number,
            time: Date,
            channel: Number,
            rssi: Number,
            snr: Number,
            rf_chain: Number,
            latitude: Number,
            longitude: Number,
            altitude: Number
        }],
        latitude: Number,
        longitude: Number,
        altitude: Number
    }
  }]
})

module.exports = mongoose.model('Nodo', NodoSchema)
