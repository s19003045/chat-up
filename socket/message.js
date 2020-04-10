const Message = require('../models/message')
const User = require('../models/user')
const Room = require('../models/room')

module.exports = {
  // 取得聊天室的訊息
  getMessage: ({ roomuuid, useruuid }) => {
    // 先取得使用者的個人資料
    return User.findOne({ uuid: useruuid })
      .exec(function (err, user) {
        if (err) return console.log(err)
        // 取得該聊天室的資料
        return Room.findOne({ uuid: roomuuid })
          .exec(function (err, room) {
            if (err) return console.log(err)
            // 取得該聊天室的所有訊息
            return Message.find({ roomId: room._id })
              .exec(function (err, messages) {
                if (err) return console.log(err)
                console.log('messages:', messages)
                // 回傳所有訊息
                return messages
              })
          })
      })
  },
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