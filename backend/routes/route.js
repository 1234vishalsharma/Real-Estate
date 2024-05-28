const router = require('express').Router();

const Login = require('../controllers/auth/Login');
const Signup = require('../controllers/auth/Signup');

router.post('/Login' , Login);
router.post('/Signup' , Signup);

module.exports = router;