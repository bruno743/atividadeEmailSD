const mongoose = require('mongoose')

const Mail = mongoose.model('Mail', {
  name: String,
})

module.exports = Mail