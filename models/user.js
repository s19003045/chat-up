const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create UserSchema
const UserSchema = new Schema({
  name: {
    type: String,
    //name 非必填欄位
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
})


const UserModel = mongoose.model('User', UserSchema)

const test = new UserModel()
console.log(test._id)

// module.exports = mongoose.model('User', UserSchema)