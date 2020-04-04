// req.isAuthenticated 是 passport 提供的方法
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    //  提示訊息
    req.flash('failure_msg', '請先登入')
    return res.redirect('/signin')
  }
}