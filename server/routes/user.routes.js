const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

// router.get('/', userController.findAll);

// router.get('/', (req,res)=>{
//     res.send('hello');
// });

router.get('/:id', userController.getUserById);

router.post('/create', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
