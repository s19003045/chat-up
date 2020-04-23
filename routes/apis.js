// import router module
const express = require('express')
const router = express.Router()
// import controllers
const userController = require('../controllers/apis/userController')
const chatController = require('../controllers/apis/chatController')
// import passport
const passport = require("../config/passport");
// autenticated (middleware)：確認使用者是否已登入
const authenticated = passport.authenticate('jwt', { session: false })

// ======== index page ========
// index page：
router.get('/', authenticated, chatController.indexPage)

// ======== userController ========
// 使用者登入
router.post('/signin', userController.signIn);
// 使用者註冊
router.post('/signup', userController.signUp)
// 使用者資料
router.get('/get_current_user', authenticated, userController.getCurrentUser)
// ======== chatController ========
// 使用者進入某個 namespace ，取出所有的 rooms
router.get('/namespace/:namespaceId', authenticated, chatController.getNamespace)
// 使用者進入某個聊天室
router.get('/chatroom/:roomId', authenticated, chatController.getRoom)
// 使用者留言
router.post('/chatroom/:roomId', authenticated, chatController.postChat)

module.exports = router

