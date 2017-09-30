'use strict';
const ServicesRoot = require('../services/index');
const PatientService = ServicesRoot.PatientService;
const WsSessionService = ServicesRoot.WsSessionService;
const PatientRcdService = ServicesRoot.PatientRcdService;
const DictionaryService = ServicesRoot.DictionaryService;
const PosService = ServicesRoot.PosService;
class BaseController {

    /**
     *
     * @param ctx
     * @param url
     * @param content
     * @returns {Promise.<void>}
     * @author yyl
     */
    async renderWithParam(ctx, url, content) {
        let param = await _updateContentWithParam(content);
        await ctx.render(url, param);
    }

    /**
     * 通用返回错误页面
     * @param ctx
     * @param error
     * @author yyl
     */
    renderError(ctx, error) {
        ctx.render(zConfig.path.errorPath, {'error': error});
    }

    async basicRcdReq(ctx) {
        let sessionId = cu.getHttpSID(ctx);
        let [loginUser, patientRcdId, patId, currGroupName, currGroupType, currPrId] =
            await WsSessionService.get(['loginUser', 'patientRcdId', 'userId', 'currGroupName', 'currGroupType', 'currPrId'], sessionId)
        let patientRcd = await PatientRcdService.getPatRcdByObjId(patientRcdId);

        return {
            sessionId,
            loginUser,
            userId: patId,
            patientRcd,
            patientRcdId,
            currPrId,
            currGroupType,
            basic: {
                sessionId,
                currGroupName,
                isSupply: false,
                currPrId: patientRcdId,
                user: loginUser.id,
                patientProp: JSON.stringify(await PatientService.getPatInfo(patId)),
                prop: patientRcd['record'][0]['prop'],
            }
        }
    }

}
module.exports = BaseController;

/************私有方法************/
/**
 * @param content
 * @returns {Promise.<{}>}
 * @private
 * @author yyl
 */
const _updateContentWithParam = async (content = {}) => {
    let [params1, params2] = [zConfig.parameters.conf1, zConfig.request.websocket];
    let param = Object.assign({}, params1, params2);
    param['session_gc_maxlifetime'] = zConfig.session.sessionTimeOutTime;
    content['confStr'] = 'var CONF=' + JSON.stringify(param);
    if (content.hasOwnProperty("prop")) {
        let prop = content["prop"];
        param['session.jsonVersion'] = prop['version'];
        content['flagStr'] = 'var FLAG = ' + JSON.stringify(prop['defaultFlags']);
        delete content['prop'];
    }
    content['confStr'] = 'var CONF = ' + JSON.stringify(param);
    return content;
}