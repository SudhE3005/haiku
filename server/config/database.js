const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/haiku")

const db= mongoose.connection
db.on('error',console.log.bind(console,'connection error'))
db.once('open',()=>{
    console.log('database connected')
})

// Export the database object
module.exports = db;
