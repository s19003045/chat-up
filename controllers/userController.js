// import services
const userService = require('../services/userService')

const userController = {
  // 登入頁面
  signInPage: (req, res) => {
    return res.render('signin')
  },
  // 註冊頁面
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  // 使用者註冊
  signUp: (req, res) => {
    return userService.signUp(req, res, (data) => {
      if (data.status === 'error') {
        req.flash("error_messages", `${data.message}`);
        return res.redirect("/signup");
      }
      if (data.status === 'success') {
        req.flash("success_messages", `${data.message}`);
        return res.redirect("/signin");
      }
    })
  }
}

module.exports = userController