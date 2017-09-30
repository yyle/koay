'use strict';
const router = require('koa-router')();
//加载控制器
const index = require('../controllers/admin/IndexController');

router.get('/', index.index);

//用戶管理
router.get('/user', user.index);
router.post('/userLst', user.lst);

module.exports = router;