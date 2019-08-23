const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/jwt', { useNewUrlParser: true })


module.exports.User = require('./users')