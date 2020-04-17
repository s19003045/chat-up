const express = require('express')
const app = express()

// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式，使用 dotenv 讀取 .env 檔案
  require("dotenv").config();
}

const port = process.env.PORT || 3000
const server = require('http').createServer(app);
// websocket
const io = require('socket.io')(server);
// others
const bodyParser = require('body-parser')
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/passport");

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
const dbURL = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : 'mongodb://localhost/chatup'
mongoose.connect(dbURL, { useNewUrlParser: true })
const db = mongoose.connection
// logger
const httpLogger = require('./config/httpLogger');
const logger = require('./config/logger');
// view engine
const exphbs = require('express-handlebars')

// use Logger
app.use(httpLogger);

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// set session
// ※注意：app.use(session({})) 必須設定在 app.use(passport.session()) 之前
app.use(session({
  secret: 'Johnny Walker', //用來簽章 sessionID 的cookie => String | Array
  resave: false,
  saveUninitialized: true,
}))
// 建立 flash 實例並使用它
app.use(flash())
// passport initialize
app.use(passport.initialize())
// 驗證使用者
app.use(passport.session())
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");

  next()
})

// view engine setting
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
// for route: change method
app.use(methodOverride("_method"));
// use public file
app.use(express.static("public"));

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')
})

// import socket setting
require('./socket/socket.js')(io)

// Server listen
server.listen(port, () => {
  console.log(`Express app listening on port ${port}!`)
});

require("./routes")(app);
