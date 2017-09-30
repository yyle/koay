'use strict';
const router = require('koa-router')();
const home_router = require('./home');
const admin_router = require('./admin');
const login = require('../controllers/LoginController');

//检查登录
router.get('*', login.checkLogin);
router.use('/', home_router.routes(), home_router.allowedMethods());
router.use('/admin', admin_router.routes(), admin_router.allowedMethods());
//检查错误
router.get('*', login.checkError);
module.exports = router;