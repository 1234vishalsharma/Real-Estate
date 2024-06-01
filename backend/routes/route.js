const router = require('express').Router();

const OAuth = require('../controllers/auth/OAuth');
const Login = require('../controllers/auth/Login');
const Signup = require('../controllers/auth/Signup');

router.post('/Login' , Login);
router.post('/Signup' , Signup);
router.post('/google' , OAuth);

module.exports = router;