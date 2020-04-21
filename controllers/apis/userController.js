// import services
const userService = require('../../services/userService')

const userController = {
  // 使用者登入
  signIn: (req, res) => {
    return userService.singIn(req, res, (data) => {
      return res.json(data)
    })
  },
  // 使用者註冊
  signUp: (req, res) => {
    return userService.signUp(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = userController