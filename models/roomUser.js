const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomUserSchema = new Schema({
  roomId: {
    type: String,
    ref: 'Room',  //關聯 Room model
    index: true,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  //關聯 User model
    index: true,
    required: true
  }
})

module.exports = mongoose.model('RoomUser', RoomUserSchema)