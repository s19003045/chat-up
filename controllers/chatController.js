// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')

const chatService = require('../services/chatService')

const chatController = {
  // 首頁
  indexPage: (req, res) => {
    return chatService.indexPage(req, res, (data) => {
      return res.render('namespaces', data)
    })
  },
  // 使用者進入某個 namespace ，取出所有的 rooms
  getNamespace: (req, res) => {
    return chatService.getNamespace(req, res, (data) => {
      return res.render('chatroom', data)
    })
  },
  // 使用者進入某個聊天室
  getRoom: (req, res) => {
    return chatService.getRoom(req, res, (data) => {
      return res.render('chatroom', data)
    })
  },
  // 使用者留言
  postChat: (req, res) => {
    return chatService.postChat(req, res, (data) => {
      if (data.status === 'error') {
        req.flash("error_messages", `${data.message}`);
        return res.redirect("back");
      }
      if (data.status === 'success') {
        req.flash("success_messages", `${data.message}`);
        return res.redirect("back");
      }
    })
  },
}

module.exports = chatController