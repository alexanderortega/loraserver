'user strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

const signUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.avatar = user.gravatar();

  user.save((err) => {
          if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

          return res.status(201).send({ token: service.createToken(user) })
      })
}

const signIn = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      req.user = user
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    });

  }).select('_id email +password');
}

module.exports = {
  signUp,
  signIn
}
