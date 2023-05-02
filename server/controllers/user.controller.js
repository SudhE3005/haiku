const User = require('../models/user.model');

const handleError = (res, err) => {
  res.status(500).send({ message: err.message || 'An unknown error occurred.' });
};

exports.createUser = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and password are required.' });
    return;
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  });

  user.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.findAll = (req, res) => {
  console.log("hi")
  User.find()
    .then(users => {
      res.json("hello");
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      console.log(req.params.userId)
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.send(user);
      }
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.updateUser = (req, res) => {

  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and password are required.' });
    return;
  }

  User.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  }, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.send(user);
      }
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.send({ message: 'User deleted successfully!' });
      }
    })
    .catch(err => {
      handleError(res, err);
    });
};
