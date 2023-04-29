const Comment = require('../models/comment.model');

exports.createComment = function(req, res) {
  let comment = new Comment({
    haiku_id: req.body.haiku_id,
    user_id: req.body.user_id,
    content: req.body.content
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send('Comment created successfully');
  });
};

exports.getCommentById = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.send(comment);
  });
};

exports.updateComment = function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.send('Comment updated successfully');
  });
};

exports.deleteComment = function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.send('Comment deleted successfully');
  });
};
