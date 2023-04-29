const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose=require('passport-local-mongoose')

const CommentSchema = new Schema({
  haiku_id: { type: Schema.Types.ObjectId, ref: 'Haiku', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

CommentSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('Comment', CommentSchema);
