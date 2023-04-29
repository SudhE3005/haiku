const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// GET request to retrieve a specific comment by ID
router.get('/:id', commentController.getCommentById);

// POST request to create a new comment
router.post('/', commentController.createComment);

// PUT request to update a comment
router.put('/:id', commentController.updateComment);

// DELETE request to delete a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
