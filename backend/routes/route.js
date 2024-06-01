const router = require('express').Router();

const OAuth = require('../controllers/auth/OAuth');
const Login = require('../controllers/auth/Login');
const Signup = require('../controllers/auth/Signup');
const getUSer = require('../controllers/getUser');
const deleteUser = require('../controllers/deleteUser');

router.post('/Login' , Login);
router.post('/Signup' , Signup);
router.post('/google' , OAuth);
router.post('/get_user' , getUSer);
router.post('/rm_user' , deleteUser);

module.exports = router;