const User = require('../models/user')

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatup', { useNewUrlParser: true })
const db = mongoose.connection

const users = require('./seedfile/users.json').users

// import other libs
const uuid = require('uuid')
const uuidv4 = uuid.v4

// import packages
const bcrypt = require('bcryptjs')

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')

  users.forEach((user, index) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return console.log(err)
        const newUser = new User({
          email: user.email,
          password: hash,
          name: user.name,
          uuid: uuidv4()
        })
        newUser.save((err, userSaved) => {
          if (err) return console.log(err)
          console.log('user save to db:', userSaved)
        })
      })
    })
  })
})


