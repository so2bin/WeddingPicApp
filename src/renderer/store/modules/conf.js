/*
*   全局配置
*/

const DOMAIN = 'localhost'
const HOST = `http://${DOMAIN}:8000`;

const state = {
    /** 本地用户信息 cookie  */
    DAY_COOKIE_EFECITVIE: 14,    // 本地用户信息cookie有效时间天数
    USER_URL: `http://${DOMAIN}`,
    USER_COOKIE_NAME: 'user',

    /* 相册模板上传时的suiteid */
    BACKIMG_SUITEID: 0,
    
    /*** 服务器路由信息  **/
    DOMAIN,
    HOST,

    API_TEST: `${HOST}/api/test/`,

    LOGINUP: `${HOST}/userinfo/validate/login-up/`,
    SENDVALIDCODE: `${HOST}/userinfo/validate/code/`,
    LOGIN: `${HOST}/userinfo/validate/login/`,
    LOGOUT: `${HOST}/userinfo/validate/login-out/`,

    SUITE_CREATE: `${HOST}/suite/create/`,
    SUITE_LIST: `${HOST}/suite/list/`,
    PIC_UPLOAD: `${HOST}/suite/upload_pic/`,
}

const mutations = {

}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
