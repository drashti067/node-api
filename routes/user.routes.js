const router = require('express').Router();
const { addUsers} = require('../controllers/users.controller');

router.post('/add', addUsers);

module.exports = router;