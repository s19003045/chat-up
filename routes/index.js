// import controllers
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')

// import helpers
// autenticated ：確認使用者是否已登入
const { authenticated } = require('../config/auth')

module.exports = (app, passport) => {
  // index page：
  app.get('/', authenticated, chatController.indexPage)

  // ======== userController ========
  // 登入頁面
  app.get('/signin', userController.signInPage)
  // 使用者登入
  app.post(
    "/signin",
    passport.authenticate("local", {
      successRedirect: '/',
      failureRedirect: "/signin",
      failureFlash: true
    })
  );
  // 註冊頁面
  app.get('/signup', userController.signUpPage)
  // 使用者註冊
  app.post('/signup', userController.signUp)

  // ======== chatController ========
  // 使用者進入某個 namespace ，取出所有的 rooms
  app.get('/namespace/:namespaceId', chatController.getNamespace)

  // 使用者進入某個聊天室
  app.get('/chatroom/:roomId', chatController.getRoom)
  // otherwise
  app.get('*', (req, res) => {
    return res.redirect('/')
  })

}

