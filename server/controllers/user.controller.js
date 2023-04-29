const User = require('../models/user.model');

// Simple version of error handler function
const handleError = (res, err) => {
  res.status(500).send({ message: err.message || 'An unknown error occurred.' });
};

// Create and save a new user
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and password are required.' });
    return;
  }

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  });

  // Save user in the database
  user.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      handleError(res, err);
    });
};

// Retrieve and return all users from the database
exports.findAll = (req, res) => {
  console.log("hi")
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      handleError(res, err);
    });
};

// Find a single user with a userId
exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
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

// Update a user identified by the userId in the request
exports.updateUser = (req, res) => {
  // Validate request
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

// Delete a user with the specified userId in the request
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
