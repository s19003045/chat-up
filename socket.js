const moment = require('./config/helper')
let userCountOnline = 0 // 初始化
const wsList = [] // websocket 連線數
const recentMessages = [] // 近期留言 [{username:username,message:message,time:time},...]
const messagesReserve = 10 // 留言保留數

module.exports = (io) => {
  // For websocket
  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    console.log(recentMessages)

    // 佔線之 websocket id List
    wsList.push(socket.id)
    console.log('wsList:', wsList)
    // 在線人數
    userCountOnline = wsList.length
    console.log('userCountOnline:', userCountOnline)
    // 
    socket.emit('users online', { userCountOnline: userCountOnline })

    // 當使用者剛進入聊天室，顯示最近10筆留言
    socket.emit('recent messages', { recentMessages: recentMessages, userCountOnline: userCountOnline })

    // 事件：使用者傳送訊息
    socket.on('client chat', function (data) {
      // 接收訊息時間
      data.time = moment.moment(new Date)
      // 保留最近留言數 10 筆
      if (recentMessages.length >= messagesReserve) {
        recentMessages.shift()
      }
      // 新增一筆留言
      recentMessages.push({ username: data.username, message: data.message, time: moment.moment(new Date) })

      // 更新在線人數
      data.userCountOnline = userCountOnline

      // 發送訊息給所有人
      io.emit('server read', data);
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

