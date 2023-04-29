const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session= require('express-session')
const flash= require('connect-flash')
const localstrategy= require('passport-local')
const users = require('./models/user.model')
// const config = require('./config/database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const sessionConfig={
  secret:'thisisasupersecret',
  resave:false,
  saveUninitialized:true,
  cookie:{
      httpOnly:true,
      expires:Date.now + 1000*60*60*24*7 , 
      maxAge:1000*60*60*24*7
  }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session());
passport.use(new localstrategy(users.authenticate()))


passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

mongoose.connect("mongodb://localhost:27017/haiku")

const db= mongoose.connection
db.on('error',console.log.bind(console,'connection error'))
db.once('open',()=>{
    console.log('database connected')
})

const userRoutes = require('./routes/user.routes');
const haikuRoutes = require('./routes/haiku.routes');
const commentRoutes = require('./routes/comment.routes');
app.use('/api/users', userRoutes);
app.use('/api/haikus', haikuRoutes);
app.use('/api/comments', commentRoutes);

const port = 3000;

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
