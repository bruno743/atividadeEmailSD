const mongoose = require('mongoose')

const Msg = mongoose.model('Msg', {
  rem: String,
  dest: String,
  ass: String, 
  msg: String
})

module.exports = Msg