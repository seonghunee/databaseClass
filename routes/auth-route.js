const express = require('express');
const authControllers = require('../controllers/auth-controllers');

const router = express.Router();

router.get('/login', authControllers.getLogin);
router.get('/regist', authControllers.getRegist);
router.post('/login', authControllers.login);
router.post('/regist', authControllers.regist);
router.post('/logout', authControllers.logout);

module.exports = router;