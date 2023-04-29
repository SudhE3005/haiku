const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose')
const Schema = mongoose.Schema;

const haikuSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  votes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

haikuSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Haiku', haikuSchema);
