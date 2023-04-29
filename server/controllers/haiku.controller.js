const Haiku = require('../models/haiku.model');

exports.createHaiku = function(req, res) {
  let haiku = new Haiku({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    created_at: req.body.created_at,
    votes: 0
  });

  haiku.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send('Haiku created successfully');
  });
};

exports.getHaikuById = function(req, res) {
  Haiku.findById(req.params.id)
    .populate('author', 'username')
    .populate('comments.user_id', 'username')
    .exec(function(err, haiku) {
      if (err) {
        return next(err);
      }
      res.send(haiku);
    });
};

exports.updateHaiku = function(req, res) {
  Haiku.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, haiku) {
    if (err) {
      return next(err);
    }
    res.send('Haiku updated successfully');
  });
};

exports.deleteHaiku = function(req, res) {
  Haiku.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.send('Haiku deleted successfully');
  });
};

exports.getAllHaikus = function(req, res) {
  Haiku.find()
    .sort({created_at: 'desc'})
    .populate('author', 'username')
    .exec(function(err, haikus) {
      if (err) {
        return next(err);
      }
      res.send(haikus);
    });
};

exports.getHaikusByUserId = function(req, res) {
  Haiku.find({author: req.params.id})
    .populate('author', 'username')
    .exec(function(err, haikus) {
      if (err) {
        return next(err);
      }
      res.send(haikus);
    });
};

exports.upvoteHaiku = function(req, res) {
  Haiku.findByIdAndUpdate(req.params.id, {$inc: {votes: 1}}, function(err, haiku) {
    if (err) {
      return next(err);
    }
    res.send('Haiku upvoted successfully');
  });
};
