// import service
const chatService = require('../../services/chatService')

const chatController = {
  // 首頁
  indexPage: (req, res) => {
    return chatService.indexPage(req, res, (data) => {
      return res.json(data)
    })
  },
  // 使用者進入某個 namespace ，取出所有的 rooms
  getNamespace: (req, res) => {
    return chatService.getNamespace(req, res, (data) => {
      return res.json(data)
    })
  },
  // 使用者進入某個聊天室
  getRoom: (req, res) => {
    return chatService.getRoom(req, res, (data) => {
      return res.json(data)
    })
  },
  // 使用者留言
  postChat: (req, res) => {
    return res.send('post chat')
  },
}

module.exports = chatController