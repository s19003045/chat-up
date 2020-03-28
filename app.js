const express = require('express')
const app = express()

// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式，使用 dotenv 讀取 .env 檔案
  require("dotenv").config();
}

const port = process.env.PORT || 3000
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatup', { useNewUrlParser: true })
const db = mongoose.connection

// view engine
const exphbs = require('express-handlebars')
// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// view engine setting
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

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

// For websocket
io.on('connection', (socket) => {
  console.log('a user connected');

  // 事件：使用者傳送訊息
  socket.on('client chat', function (data) {
    console.log('client message:', data)

    // 發送訊息給所有人
    io.emit('server read', data);
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

// Server listen
server.listen(port, () => {
  console.log(`Express app listening on port ${port}!`)
});

require("./routes")(app);

// module.exports = app;