'use strict'


const services = require('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes Autorización'})
  }

  const token = req.headers.authorization.split(' ')[1]

  service.decodeToken(token)
  .then(response => {
    req.user = response
    next()
  })
  .catch(response => {
    res.status(responde.status)
  })
}

module.exports = isAuth
