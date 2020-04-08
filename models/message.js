const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  //關聯 User model
    index: true,
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',  //關聯 Room model
    index: true,
    required: true,
  }
})

module.exports = mongoose.model('Message', MessageSchema)