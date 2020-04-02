const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NamespaceSchema = new Schema({
  uuid: {
    type: String, // uuidv4
    required: true
  },
  name: {
    type: String, // display on client (可保留大小寫及空格)
    required: true
  },
  pathname: {
    type: String, // 將 name 去除空格並轉成小寫
    required: true
  },
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room',  //關聯 Room model
    index: true
  }],
  publicForSearch: {
    type: Boolean, // 是否對外開放搜尋
    required: true,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Namespace', NamespaceSchema)