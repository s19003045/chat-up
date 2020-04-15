// import router module
const express = require('express')
const router = express.Router()
// import controllers
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
// import passport
const passport = require("../config/passport");
// import helpers
// autenticated ：確認使用者是否已登入
const { authenticated } = require('../config/auth')


// index page：
router.get('/', authenticated, chatController.indexPage)

// ======== userController ========
// 登入頁面
router.get('/signin', userController.signInPage)
// 使用者登入
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: "/signin",
    failureFlash: true
  })
);
// 註冊頁面
router.get('/signup', userController.signUpPage)
// 使用者註冊
router.post('/signup', userController.signUp)

// ======== chatController ========
// 使用者進入某個 namespace ，取出所有的 rooms
router.get('/namespace/:namespaceId', chatController.getNamespace)

// 使用者進入某個聊天室
router.get('/chatroom/:roomId', chatController.getRoom)

// 使用者留言
router.post('/chatroom/:roomId', chatController.postChat)

// otherwise
router.get('*', (req, res) => {
  return res.redirect('/')
})

module.exports = router



