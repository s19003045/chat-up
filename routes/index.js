module.exports = (app, passport) => {
  // index page
  app.get('/', (req, res) => {
    return res.render('chatroom')
  })

  // chatroom
  app.get('/chatroom', (req, res) => {
    return res.redirect('/')
  })

  // otherwise
  app.get('*', (req, res) => {
    return res.redirect('/')
  })

}

