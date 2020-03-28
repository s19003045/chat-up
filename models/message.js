const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  //關聯 users model
    index: true,
    // required: true,
  },
})

module.exports = mongoose.model('Message', MessageSchema)