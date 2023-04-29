const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET request to retrieve all users
router.get('/', userController.findAll);

// GET request to retrieve a specific user by ID
router.get('/:id', userController.getUserById);

// POST request to create a new user
router.post('/', userController.createUser);

// PUT request to update a user
router.put('/:id', userController.updateUser);

// DELETE request to delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
