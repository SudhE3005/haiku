const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session= require('express-session')
const flash= require('connect-flash')
const localstrategy= require('passport-local')
const users = require('./models/user.model')

const userController = require('./controllers/user.controller');
const haikuController = require('./controllers/haiku.controller');
const commentController = require('./controllers/comment.controller');

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

const port = 3000;

app.get('/user', userController.findAll);

app.get('/user/:id', userController.getUserById);

app.post('/user/create', userController.createUser);

app.put('/user/:id', userController.updateUser);

app.delete('/user/:id', userController.deleteUser);

app.get('/haiku/', haikuController.getAllHaikus);

app.get('/haiku/:id', haikuController.getHaikuById);

app.post('/haiku/', haikuController.createHaiku);

app.put('/haiku/:id', haikuController.updateHaiku);

app.delete('/haiku/:id', haikuController.deleteHaiku);

app.post('/haiku/:id/vote', haikuController.upvoteHaiku);

app.get('/haiku/user/:userId', haikuController.getHaikusByUserId);

app.get('/comment/:id', commentController.getCommentById);

app.post('/comment/', commentController.createComment);

app.put('/comment/:id', commentController.updateComment);

app.delete('/comment/:id', commentController.deleteComment);

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
