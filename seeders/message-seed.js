// import model
const Message = require('../models/message')
const User = require('../models/user')
const Room = require('../models/room')

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatup', { useNewUrlParser: true })
const db = mongoose.connection

// import other libs
const uuid = require('uuid')
const uuidv4 = uuid.v4

// import seed file
const messages = require('./seedfile/message.js')

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')

  return User.find({}, function (err, resUser) {
    if (err) return console.error(err)
    return Room.find({}, function (err, resRoom) {
      if (err) return console.error(err)
      const resUserId = resUser.map(item => (item._id))
      const resRoomId = resRoom.map(item => (
        item._id
      ))

      const newMessages = messages.map((item) => ({
        ...item,
        userId: resUserId[Math.floor(Math.random() * resUserId.length)],
        roomId: resRoomId[Math.floor(Math.random() * resRoomId.length)]
      }))

      // 以 array 寫入 collection
      Message.insertMany(newMessages, (err) => {
        if (err) return console.log(err)
        console.log('insert to db successifully')
      })
    })
  })


})


