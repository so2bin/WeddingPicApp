/*
*   全局配置
*/

const DOMAIN = 'localhost'
const HOST = `http://${DOMAIN}:8000`;

const state = {
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
