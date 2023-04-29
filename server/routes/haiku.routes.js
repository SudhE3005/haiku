const express = require('express');
const router = express.Router();
const haikuController = require('../controllers/haiku.controller');

router.get('/', haikuController.getAllHaikus);

router.get('/:id', haikuController.getHaikuById);

router.post('/', haikuController.createHaiku);

router.put('/:id', haikuController.updateHaiku);

router.delete('/:id', haikuController.deleteHaiku);

router.post('/:id/vote', haikuController.upvoteHaiku);

router.get('/user/:userId', haikuController.getHaikusByUserId);

module.exports = router;
