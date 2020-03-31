const Message = require('../models/message')
const User = require('../models/user')

module.exports = {
  // 儲存訊息
  postMessage: (data, user) => {
    const message = new Message({
      message: data.message,
      userId: user._id
    })
    message.save((err) => {
      if (err) return console.log(err)
    })
  }
}