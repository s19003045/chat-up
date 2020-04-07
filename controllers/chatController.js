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

        const data = rooms.map((room) => {
          return {
            usersCount: room.usersCount,
            uuid: room.uuid,
            name: room.name,
            public: room.public
          }
        })

        return res.render('chatroom1', { data })
      })
    })
  },
  },

module.exports = chatController