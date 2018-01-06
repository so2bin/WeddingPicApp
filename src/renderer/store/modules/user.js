/**
 *  user data
 */
 const conf = require('./conf').default;
 const ses = require('electron').remote.getCurrentWebContents().session;

const DOMAIN = conf.state.DOMAIN;
const USER_URL = conf.state.USER_URL;
const USER_COOKIE_NAME = conf.state.USER_COOKIE_NAME

 const state = {
     id: null,
     phone: "",
     nickname: "",
     csrftoken: null
 }

 const mutations = {
     // 不保存到session（由session初始化用户信息时用）
     init_logined_user_data(state, {type, val}){
         state[type] = val;
     },
     // 保存到session
     set_user_data(state, {type, val}){
         state[type] = val;
         // 默认保存15天，与服务器cookie一样
         let now = new Date();
         now.setDate(now.getDate() + conf.state.DAY_COOKIE_EFECITVIE)
         ses.cookies.set({
             'domain': DOMAIN,
             'url': USER_URL,
             'path': '/',
             'name': USER_COOKIE_NAME,
             'value': JSON.stringify(state),
             'expirationDate': now.getTime()/1000
         }, (err)=>{
             if(err){
                 console.error(err);
             }
         })
     },
     set_csrf(state, val){
        state.csrftoken = val;
     },
     clear_user(){
         ses.cookies.remove(USER_URL, USER_COOKIE_NAME, ()=>{
             console.log('clear user cookie data!');
         })
     }
 }

 const actions = {

 }

const getters = {
    initCsrf(state){
        return new Promise((resolve, reject)=>{
            ses.cookies.get({
                domain: DOMAIN, name: 'csrftoken'
            }, (err, cookies)=>{
                if(err){
                    reject(err);
                }
                if(cookies && cookies.length > 0){
                    let csrf = cookies[0].value;
                    state.csrftoken = csrf;
                    resolve(csrf);
                }else{
                    resolve(null);
                }
            })
        })
    }
}

 export default {
   state,
   mutations,
   actions,
   getters
 }
