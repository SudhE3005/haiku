const express = require('express');
const router = express.Router();
const haikuController = require('../controllers/haiku.controller');

// GET request to retrieve all haikus
router.get('/', haikuController.getAllHaikus);

// GET request to retrieve a specific haiku by ID
router.get('/:id', haikuController.getHaikuById);

// POST request to create a new haiku
router.post('/', haikuController.createHaiku);

// PUT request to update a haiku
router.put('/:id', haikuController.updateHaiku);

// DELETE request to delete a haiku
router.delete('/:id', haikuController.deleteHaiku);

// POST request to upvote a haiku
router.post('/:id/vote', haikuController.upvoteHaiku);

// POST requesr to send all haikus of a user
router.get('/user/:userId', haikuController.getHaikusByUserId);

module.exports = router;
