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

    /*** 服务器路由信息  **/
    DOMAIN,
    HOST,
    LOGINUP: `${HOST}/userinfo/validate/login-up/`,
    SENDVALIDCODE: `${HOST}/userinfo/validate/code/`,
    LOGIN: `${HOST}/userinfo/validate/login/`,
    LOGOUT: `${HOST}/userinfo/validate/login-out/`,
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
