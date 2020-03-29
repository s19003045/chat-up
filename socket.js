
module.exports = (io) => {
  // For websocket
  io.on('connection', (socket) => {
    console.log('a user connected');

    // 事件：使用者傳送訊息
    socket.on('client chat', function (data) {
      console.log('client message:', data)

      // let message = `${data.username}  :  ${data.message}`
      // 發送訊息給所有人
      io.emit('server read', data);
    })

    socket.on('disconnect', function () {
      console.log('user disconnected');
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

