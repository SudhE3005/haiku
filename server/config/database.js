const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/haiku")

const db= mongoose.connection
db.on('error',console.log.bind(console,'connection error'))
db.once('open',()=>{
    console.log('database connected')
})

module.exports = db;
