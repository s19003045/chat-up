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

      return res.render('namespace', { publicNsps, privateNsps })
    })

  },
  },

module.exports = chatController