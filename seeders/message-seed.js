const Message = require('../models/message')

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatup', { useNewUrlParser: true })
const db = mongoose.connection

const messages = require('./message.js')

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')
})

// 以 array 寫入 collection
Message.insertMany(messages, (err) => {
  if (err) return console.log(err)
  console.log('insert to db successifully')
})
