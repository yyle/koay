'use strict';
const router = require('koa-router')();
//加载控制器

const login = require('../controllers/LoginController');


router.get('', login.index);
router.get('loginOut', login.loginOut);
router.get('error', login.toError);

module.exports = router;