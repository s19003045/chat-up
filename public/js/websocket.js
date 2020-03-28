$(function () {
  // 建立 websocket 實例
  var socket = io();

  // 事件：連結
  socket.on('connect', function () {
    console.log('websocket connected')
  });

  // 接收訊息
  socket.on('news', function (data) {
    console.log('news data:', data);
    socket.emit('test event', { my: 'data' });
  });

  // 事件：斷連結
  socket.on('disconnect', function () {
    console.log('websocket disconnected')
  });

  // 事件：server 已讀取使用者傳送的訊息
  socket.on('server read', function (data) {
    $('#messages').append(`<li class="list-group-item">${data}</li>`)
  })

  $('form').submit(function (e) {
    e.preventDefault()
    var message = $('#m').val()
    socket.emit('client chat', `${message}`)

    // clear input
    $('#m').val('')

    return false
  })
});
