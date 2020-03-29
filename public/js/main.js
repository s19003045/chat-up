$(function () {
  // === username input ===
  var username
  $('.btn-username-input-save').click(function (e) {
    e.preventDefault()
    username = $('#username-input').val()

    $('.btn-type-name').text(`Your name: ${username}`)
    $('#usernameInput').modal('hide')
  })

  $('#username-input').focus(function (e) {
    $('.small-hint').text('user is typing...')
  })
  $('#username-input').focusout(function (e) {
    $('.small-hint').text('')
  })

  // ==== websocket====
  // 建立 websocket 實例
  var socket = io();

  // 事件：連結
  socket.on('connect', function () {
    console.log('websocket connected')
  });

  // 事件：斷連結
  socket.on('disconnect', function () {
    console.log('websocket disconnected')
  });

  // 事件：server 已讀取使用者傳送的訊息
  socket.on('server read', function (data) {
    $('#messages').append(`<li class="list-group-item">${data}</li>`)
  })

  // 傳送訊息
  $('form').submit(function (e) {
    e.preventDefault()
    var message = $('#message-input').val()
    socket.emit('client chat', { username: username, message: message })

    // clear input
    $('#message-input').val('')

    return false
  })

})