const Haiku = require('../models/haiku.model');

exports.createHaiku = function(req, res) {
  const { title, content, author } = req.body;

  const newHaiku = new Haiku({
    title: title,
    content: content,
    author: author
  });

  newHaiku.save()
    .then(createdHaiku=>{
      res.status(201).json(createdHaiku);
    })
    .catch(err=>{
      res.status(500).json({ message: 'Error creating haiku', error: err });
    });
};


exports.getHaikuById = function(req, res) {
  const haikuId = req.params.id;

  Haiku.findById(haikuId)
    .populate('author', 'username')
    .exec()
    .then(haiku => {
      if (!haiku) {
        return res.status(404).json({ message: 'Haiku not found' });
      }
      res.send(haiku);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving haiku', error: err });
    });
};


exports.updateHaiku = function(req, res) {
  const haikuId = req.params.id;
  const update = req.body;

  Haiku.findByIdAndUpdate(haikuId, update, { new: true })
    .exec()
    .then(updatedHaiku => {
      if (!updatedHaiku) {
        return res.status(404).json({ message: 'Haiku not found' });
      }
      res.send(updatedHaiku);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating haiku', error: err });
    });
};


exports.deleteHaiku = function(req, res) {
  const haikuId = req.params.id;
  Haiku.findByIdAndRemove(haikuId)
    .exec()
    .then(deletedHaiku => {
      if (!deletedHaiku) {
        return res.status(404).json({ message: 'Haiku not found' });
      }
      res.json({ message: 'Haiku deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting haiku', error: err });
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
  const userId = req.params.id;

  Haiku.find({ author: userId })
    .sort({ created_at: -1 })
    .populate('author', 'username')
    .exec()
    .then(haikus => {
      res.send(haikus);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving haikus by user ID', error: err });
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
