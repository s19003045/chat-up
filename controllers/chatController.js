// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')

const chatController = {
  // 首頁
  indexPage: (req, res) => {
    return Namespace.find({}, function (err, nsps) {
      if (err) return console.log(err)

      // 整理要傳至 view 的資料
      const data = nsps.map(nsp => ({
        uuid: nsp.uuid,
        name: nsp.name,
        pathname: nsp.pathname,
        publicForSearch: nsp.publicForSearch
      }))
      // 公開的 namespaces
      const publicNsps = data.filter(function (nsp) {
        return nsp.publicForSearch
      })
      // 不公開的 namespaces
      const privateNsps = data.filter(function (nsp) {
        return !nsp.publicForSearch
      })

      return res.render('namespaces', { publicNsps, privateNsps })
    })

  },
  // 使用者進入某個 namespace ，取出所有的 rooms
  getNamespace: (req, res) => {
    return Namespace.findOne({ uuid: req.params.namespaceId }, function (err, nsp) {
      if (err) return console.log(err)

      return Room.find({ namespaceId: nsp._id }, function (err, rooms) {
        if (err) return console.log(err)

        const roomData = rooms.map((room) => {
          return {
            usersCount: room.usersCount,
            uuid: room.uuid,
            name: room.name,
            public: room.public
          }
        })
        const nspData = {
          name: nsp.name,
          pathname: nsp.pathname,
          uuid: nsp.uuid
        }

        return res.render('chatroom', { roomData, nspData })
      })
    })
  },
  // 使用者進入某個聊天室
  getRoom: (req, res) => {
    console.log('roomId:', req.params.roomId)
    return Room.findOne({ uuid: req.params.roomId }, function (err, room) {

      return Message.find({ roomId: room._id }, function (err, messages) {
        return res.render('chatroom', { messages })
      })
    })
  },
  // 使用者留言
  postChat: (req, res) => {
    return res.send('post chat')
  },
}

module.exports = chatController