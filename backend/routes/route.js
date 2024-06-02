const router = require('express').Router();

const OAuth = require('../controllers/auth/OAuth');
const Login = require('../controllers/auth/Login');
const Signup = require('../controllers/auth/Signup');
const getUSer = require('../controllers/getUser');
const deleteUser = require('../controllers/deleteUser');
const UpdateUser = require('../controllers/UpdateUser');

router.post('/Login' , Login);
router.post('/Signup' , Signup);
router.post('/google' , OAuth);
router.post('/get_user' , getUSer);
router.delete('/rm_user' , deleteUser);
router.put('/UpdateUser' , UpdateUser);

module.exports = router;