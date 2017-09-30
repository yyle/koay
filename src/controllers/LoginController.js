'use strict';
const BaseController = require('./BaseController');
class LoginController extends BaseController {
    /**
     * 去往登录页面
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async index(ctx, next) {
    }
}

module.exports = new LoginController;
