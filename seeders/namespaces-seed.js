// import model
const Namespace = require('../models/namespace')

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatup', { useNewUrlParser: true })
const db = mongoose.connection

// import other libs
const uuid = require('uuid')
const uuidv4 = uuid.v4

// import seed file
const namespaces = require('./seedfile/namespaces').namespaces

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')
  const newNamespaces = namespaces.map((item) => ({
    uuid: uuidv4(),
    name: item.name,
    pathname: `/${item.name.replace(/\s+/g, "").toLowerCase()}`,
    publicForSearch: true
  }))

  // 以 array 寫入 collection
  Namespace.insertMany(newNamespaces, (err) => {
    if (err) return console.log(err)
    console.log('insert to db successifully')
  })
})



