const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  uuid: {
    type: String, // uuidv4
    required: true
  },
  name: {
    type: String, // room name
    required: true
  },
  public: {
    type: Boolean,
    required: true,
    default: false
  },
  usersCount: {
    type: Number,  //群組人數
    default: 1 //剛建立時只有1個人
  },
  creatorId: { //建立者
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }],
  namespaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Namespace',  //關聯 Namespace model
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Room', RoomSchema)