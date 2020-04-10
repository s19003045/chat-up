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

  const myAvatarUrl = 'https://picsum.photos/id/237/100/100'

  const otherAvatarUrl = 'https://picsum.photos/id/400/100/100'

  // 事件：連結
  socket.on('connect', function () {
    console.log('websocket connected')
  });

  // 事件：連結
  socket.on('users online', function (data) {
    // 顯示在線人數
    $('.userCountOnline span').text(data.userCountOnline)
  });

  // 事件：使用者剛上線時，顯示近10筆訊息
  // socket.on('recent messages', function (data) {
  //   // 顯示近10筆訊息
  //   data.recentMessages.forEach(d => {
  //     // 新增訊息
  //     $('#messages').append(`<li class="shadow list-group-item mb-3 py-1 ${data.username === username ? ' bg-info text-light ' : ' bg-light text-dark '}">
  //       <div class="">
  //         <img src="${data.username === username ? myAvatarUrl : otherAvatarUrl}" alt="" class="avatar mr-2">
  //         <span class="font-weight-bold">${d.username}</span>  :  ${d.message}
  //         <br>
  //         <small class="ml-5 mt-1 bg-light text-dark">${d.time}</small>
  //       </div>
  //     </li>`)
  //   })
  // })

  // 事件：進入某個聊天室
  $('#roomlist-sidebar a').click(function (e) {
    e.preventDefault()
    console.log('e.target:', e.target)

    // 取得 room uuid 及 user uuid
    let roomuuid = $(this).data("uuid")
    console.log('roomuuid:', roomuuid)
    const useruuid = $('#roomlist-sidebar').data('useruuid')

    // socket emit
    socket.emit('into room', { roomuuid: roomuuid, useruuid: useruuid })
  })

  // 接收該聊天室所有的訊息
  socket.on('room messages', function (data) {
    console.log('data:', data)
  })

  // 事件：斷連結
  socket.on('disconnect', function () {
    console.log('websocket disconnected')
  });


  // 事件：server 已讀取使用者傳送的訊息
  socket.on('server read', function (data) {
    const avatarUrl = data.username === username ? myAvatarUrl : otherAvatarUrl
    const customCss = data.username === username ? ' bg-info text-light ' : ' bg-light text-dark '

    // 新增訊息
    $('#messages').append(`<li class="shadow list-group-item mb-3 py-1 ${customCss}">
        <div class="">
          <img src="${avatarUrl}" alt="" class="avatar mr-2">
          <span class="font-weight-bold">${data.username}</span>  :  ${data.message}
          <br>
          <small class="ml-5 mt-1">${data.time}</small>
        </div>
      </li>`)

    // 更新在線人數
    $('.userCountOnline span').text(data.userCountOnline)
    // scroll to bottom
    $('html,body').animate({
      scrollTop: $("#messages li:last-child").offset().top
    }, 300);
  })

  // 傳送訊息
  $('form.message-send').submit(function (e) {
    e.preventDefault()
    var message = $('#message-input').val()

    const data = {
      username: username,
      message: message,
      email: 'user1@example.com' ///email 為假資料
    }
    socket.emit('client chat', data)

    // clear input
    $('#message-input').val('')

    return false
  })

  // 加入聊天室
  socket.emit('join room', { room: 'AlphaCamp', user: 'John' })

  // 接收是否成功加入聊天室的訊息
  socket.on('join message', function (data) {
    console.log(data)
  })


  // 建立傳訊息模式
  socket.emit('event name', {
    namespace: '',
    room: '',
    name: '',
    message: ''
  })

})