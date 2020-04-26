const Message = require('../models/message')
const User = require('../models/user')
const Room = require('../models/room')

module.exports = {
  getRoom: (roomuuid) => {
    return Room.findOne({ uuid: roomuuid }, (err, room) => {
      if (err) return console.log(err)
      return room
    })
  }
}