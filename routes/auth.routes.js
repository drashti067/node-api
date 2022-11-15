const  router = require("express").Router();
const {login} = require("../controllers/auth.controller");
const { UserAuthCheck } = require("../middleware/auth.middleware");

router.post('/login', UserAuthCheck, login);

module.exports = router;