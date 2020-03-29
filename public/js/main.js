$(function () {
  // === username input ===
  var username = 'anonymous'
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
  // var nsp = io.connect('http://localhost/my-namespace')
  // Namespace: my-namespace
  // const socket = io('/my-namespace');

  // 事件：連結
  socket.on('connect', function () {
    console.log('websocket connected')
  });

  // 事件：斷連結
  socket.on('disconnect', function () {
    console.log('websocket disconnected')
  });

  const myAvatarUrl = 'https://picsum.photos/id/237/100/100'

  const otherAvatarUrl = 'https://picsum.photos/id/400/100/100'
  // 事件：server 已讀取使用者傳送的訊息
  socket.on('server read', function (data) {
    const avatarUrl = data.username === username ? myAvatarUrl : otherAvatarUrl
    const customCss = data.username === username ? ' bg-info text-light ' : ' bg-light text-dark '

    $('#messages').append(`<li class="shadow list-group-item mb-3 py-1 ${customCss}">
        <div class="">
          <img src="${avatarUrl}" alt="" class="avatar mr-2">
          ${data.username}  :  ${data.message}
        </div>
      </li>`)

    // scroll to bottom
    $('html,body').animate({
      scrollTop: $("#messages li:last-child").offset().top
    }, 300);
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