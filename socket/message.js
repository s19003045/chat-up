const Message = require('../models/message')
const User = require('../models/user')
const Room = require('../models/room')

// import helpers
const helpers = require('../config/helper')

module.exports = {
  // 取得聊天室的訊息
  getMessages: (roomuuid, useruuid, socket) => {
    // 先取得使用者的個人資料
    return User.findOne({
      uuid: useruuid
    })
      .exec(function (err, user) {
        if (err) return console.log(err)
        // 取得該聊天室的資料
        return Room.findOne({
          uuid: roomuuid
        })
          .exec(function (err, room) {
            if (err) return console.log(err)
            // 取得該聊天室的所有訊息
            return Message.find(
              { roomId: room._id },
              null,
              {
                limit: 10, //顯示近10筆訊息
                sort: { created_date: -1 }
              })
              .populate({
                path: 'userId', select: ['name', 'uuid']
              })
              .exec(function (err, messages) {
                if (err) return console.log(err)
                const messagesModify = messages.map(d => {
                  return {
                    message: d.message,
                    userId: d.userId,
                    roomId: d.roomId,
                    created_date: helpers.moment(d.created_date),
                  }
                })
                const data = {
                  status: 'ok',
                  messages: messagesModify
                }
                // 回傳聊天室的訊息給使用者
                socket.emit('room messages', { data })
              })
          })
      })
  },
  // 儲存訊息
  postMessage: (data, user, room) => {
    const message = new Message({
      message: data.message,
      userId: user._id,
      roomId: room._id
    })
    message.save((err) => {
      if (err) return console.log(err)
    })
  }
}