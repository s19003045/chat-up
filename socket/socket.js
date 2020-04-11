const moment = require('../config/helper')
let userCountOnline = 0 // 初始化
const wsList = [] // websocket 連線數
const recentMessages = [] // 近期留言 [{username:username,message:message,time:time},...]
const messagesReserve = 10 // 留言保留數

const wsMessage = require('./message')
const wsUser = require('./user')

module.exports = (io) => {
  // For websocket
  io.on('connection', (socket) => {
    // 佔線之 websocket id List
    wsList.push(socket.id)
    // 在線人數
    userCountOnline = wsList.length
    // 在線人數顯示
    socket.emit('users online', { userCountOnline: userCountOnline })

    // 當使用者剛進入聊天室，顯示最近10筆留言
    // socket.emit('recent messages', { recentMessages: recentMessages, userCountOnline: userCountOnline })

    // 事件：使用者傳送訊息
    socket.on('client chat', async function (data) {
      /* data 格式
      data = {
        username: username,
        message: message,
        email: email
      }
      */

      // 從資料庫中尋找該 user 之資料
      const getUserResult = await wsUser.getUser(data.email)
      // 儲存至 mongodb
      wsMessage.postMessage(data, getUserResult)

      // 接收訊息時間
      data.time = moment.moment(new Date)
      // 保留最近留言數 10 筆
      if (recentMessages.length >= messagesReserve) {
        recentMessages.shift()
      }
      // 新增一筆留言
      recentMessages.push({ username: data.username, message: data.message, time: moment.moment(new Date) })
      // 發送訊息給所有人
      io.emit('server read', data);
    })

    // 事件：使用者進入某個聊天室
    socket.on('into room', function (data) {
      const { roomuuid, useruuid } = data
      // 取得聊天室的訊息，並透過 websocket 傳送訊息
      wsMessage.getMessages(roomuuid, useruuid, socket)
    })

    // ===========使用者加入某個聊天室==========
    socket.on('join room', function (data) {
      socket.join(`${data.room}`).emit('join message', {
        room: data.room,
        joinDate: new Date,
        message: `welcome to room ${data.room}`
      })

    })

    socket.on('disconnect', function () {
      console.log('user disconnected');
      wsList.splice(wsList.indexOf(socket.id))
    });
  });

  // news namespace
  // const nsp = io.of('/my-namespace');
  // nsp.on('connection', function (socket) {
  //   console.log('someone connected');
  //   socket.emit('server read', 'hello~')
  // });
  // nsp.emit('hi', 'everyone!');
}

