const Message = require('../models/message')
const User = require('../models/user')

module.exports = {
  // 從資料庫中取得使用者資料
  getUser: (email) => {
    return User.findOne({ email: email }, function (err, result) {
      if (err) return console.log(err)
      return result
    })
  }
}