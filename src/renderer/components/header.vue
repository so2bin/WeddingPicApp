<template lang="">
    <div class="header" style="-webkit-app-region: drag;">
        <div class="account-img">
            <img src="/static/img/icons/account.svg" alt="" @click="openLoginedTips" />
                <!-- v-on:mouseenter="showAcctTipsToggle(true)" v-on:mouseleave="showAcctTipsToggle(false)"> -->
            <div class="account-tips" v-show="bShowAccountTips && isLogined">
                <div class="" id="log-out" @click="logout">
                    <span>退出登陆</span>
                </div>
                <div class="">
                    <span>昵称：{{ nickname }}</span>
                    <span>帐号：{{ phone }}</span>
                </div>
            </div>
        </div>
        <div class="login" v-show="bShowLogin">
            <div class="" v-show="loginCtl.useMain">
                <img src="/static/img/icons/close.svg" alt="" class="close-login" @click="closeLogin(0)">
                <div class="register">
                    <div class="register-main-row" @click="goRegister">手机注册</div>
                    <div class="register-main-row" @click="goLogin">登录</div>
                </div>
            </div>
            <div class="" v-show="loginCtl.useRegister">
                <img src="/static/img/icons/close.svg" alt="" class="close-login" @click="closeLogin(1)">
                <div class="loginup">
                    <div class="loginup-row">
                        <!-- <img src="/static/img/icons/phone.svg" alt="" class="loginup-row-img">
                        手机 -->
                        <el-input placeholder="请输入手机号" prefix-icon="el-icon-date"
                            v-model="phone" size="medium" :maxlength="11" clearable>
                        </el-input>
                    </div>
                    <div class="loginup-row">
                        <!-- <img src="/static/img/icons/password.svg" alt="" class="loginup-row-img">
                        密码 -->
                        <el-input placeholder="密码" prefix-icon="el-icon-view"
                            v-model="passwd" size="medium" :minlength="6" clearable>
                        </el-input>
                    </div>
                    <div class="loginup-row">
                        <el-input placeholder="昵称" prefix-icon="el-icon-view"
                            v-model="nickname" size="medium" :maxlength="8" clearable>
                        </el-input>
                    </div>
                    <div class="loginup-row">
                        <el-input placeholder="验证码" style="width:130px;"
                            v-model="code" size="medium">
                        </el-input>
                        <input type="button" name="" value="发送验证码"
                            style="height:36px;width:100px;position:relative;top:4px;line-height:36px;"
                            class="btn-loginup" :class="{btnDisabled: validBtnDisabled}"
                            @click="sendValidCode"> {{ codeCounter }}s
                    </div>
                    <div class="loginup-btn-row">
                        <input type="button" name="注册" value="注册" class="btn-loginup"
                        v-bind:class="{logBtnClicked: logupClicked, btnDisabled: logupDisabled}" v-on:click="loginup">
                    </div>
                </div>
            </div>
            <div class="" v-show="loginCtl.useLogin">
                <img src="/static/img/icons/close.svg" alt="" class="close-login" @click="closeLogin(2)">
                <div class="loginup">
                    <div class="loginup-row">
                        <!-- <img src="/static/img/icons/phone.svg" alt="" class="loginup-row-img">
                        手机 -->
                        <el-input placeholder="请输入手机号" prefix-icon="el-icon-date"
                            v-model="phone" size="medium" :maxlength="11" clearable>
                        </el-input>
                    </div>
                    <div class="loginup-row">
                        <!-- <img src="/static/img/icons/password.svg" alt="" class="loginup-row-img">
                        密码 -->
                        <el-input placeholder="密码" prefix-icon="el-icon-view"
                            v-model="passwd" size="medium" :minlength="6" clearable>
                        </el-input>
                    </div>
                    <div class="loginup-btn-row">
                        <input type="button" name="登陆" value="登陆" class="btn-loginup"
                        v-bind:class="{logBtnClicked: loginClicked, btnDisabled: loginDisabled}" v-on:click="loginin">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="">
const ses = require('electron').remote.getCurrentWebContents().session;

    export default {
        data() {
            return {
                isLogined: false,
                bShowAccountTips: false,   // 用户信息小卡片图
                bFixAccountTips: false,  // 显示信息小卡片
                bShowLogin: false,  // 登录界面
                loginCtl: {
                    useMain: true,
                    useRegister: false,
                    useLogin: false
                },
                id: "",
                phone: "",
                passwd: "",
                code: "",  // 验证码
                nickname: "",
                logupClicked: false,
                loginClicked: false,
                logoutClicked: false,
                USER_COOKIE_NAME: this.$store.state.conf.USER_COOKIE_NAME,
                DOMAIN: this.$store.state.conf.DOMAIN,
                LOGINUP: this.$store.state.conf.LOGINUP,
                LOGIN: this.$store.state.conf.LOGIN,
                LOGOUT: this.$store.state.conf.LOGOUT,
                SENDVALIDCODE: this.$store.state.conf.SENDVALIDCODE,
                validBtnDisabled: false,
                logupDisabled: true,
                loginDisabled: false,
                logoutDisabled: false,
                codeCounter: "",   // 验证码60s计数器
            }
        },
        computed: {
            user: {
                get(){
                    return this.$store.state.user;
                }
            }
        },
        methods: {
            set_user(user) {
                this.$store.commit('set_user_data', {type: 'id', val: user.id});
                this.$store.commit('set_user_data', {type: 'phone', val: user.phone});
                this.$store.commit('set_user_data', {type: 'nickname', val: user.nickname});
                this.id = user.id; this.phone = user.phone; this.nickname = user.nickname;
            },
            clear_user(){
                this.id = ""; this.phone=""; this.nickname="";
                this.$store.commit('clear_user');
            },
            showAcctTipsToggle(val){
                if(this.isLogined){
                    this.bShowAccountTips = val;
                }
            },
            openLoginedTips(){
                if(!this.isLogined){
                    this.bShowLogin = !this.bShowLogin;
                }else{
                    this.bShowAccountTips = !this.bShowAccountTips;
                }
            },
            goRegister(){
                this.loginCtl.useMain = false;
                this.loginCtl.useRegister = true;
            },
            goLogin(){
                this.loginCtl.useMain = false;
                this.loginCtl.useLogin = true;
            },
            closeLogin(v){
                if(v == 0){
                    this.bShowLogin = false;
                }else if(v == 1){
                    this.loginCtl.useRegister = false;
                    this.loginCtl.useMain = true;
                }else if(v == 2){
                    this.loginCtl.useLogin = false;
                    this.loginCtl.useMain = true;
                }
            },
            // 注册
            loginup(e) {
                if(this.logupDisabled){
                    return;
                }
                this.logupClicked = true;
                this.$http.post(this.LOGINUP, {
                    phone: this.phone,
                    code: this.code,
                    password: this.passwd,
                    nickname: this.nickname
                })
                .then((res)=>{
                    let data = res.data;
                    if(data.status){
                        throw new Error(data.msg);
                    }
                    return data.data;
                })
                // 登陆
                .then((user)=>{
                    return this.$http.post(this.LOGIN, {
                        phone: this.phone,
                        password: this.passwd
                    })
                })
                .then((res)=>{
                    this.logupClicked = false;
                    let data = res.data;
                    if(data.status){
                        throw new Error(data.msg);
                    }else{
                        this.isLogined = true;
                        let user = data.data;
                        this.set_user(user);
                        this.closeLogin(0);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    this.logupClicked = false;
                })
            },
            // 发送验证码
            sendValidCode(e){
                if(this.validBtnDisabled){
                    return;
                }
                this.validBtnDisabled = true;
                this.$http.post(this.SENDVALIDCODE, {
                    phone: this.phone
                })
                .then((res)=>{
                    let data = res.data
                    if(data.status){
                        console.error('发送验证码失败：', data.msg);
                        this.validBtnDisabled = false;
                    }else{
                        console.log('发送验证码成功');
                        let t = 60;
                        let timer = setInterval(()=>{
                            this.codeCounter = --t;
                            if(t == 0){
                                this.validBtnDisabled = false;
                                clearInterval(timer);
                            }
                        }, 1000)
                        this.logupDisabled = false;
                    }
                })
                .catch((err)=>{
                    console.error('发送验证码出错', err);
                    this.validBtnDisabled = false;
                })
            },
            // 登录
            loginin(e){
                if(this.loginDisabled){
                    return;
                }
                this.loginClicked = true;
                this.$http.post(this.LOGIN, {
                    phone: this.phone,
                    password: this.passwd
                })
                .then((res)=>{
                    this.loginClicked = false;
                    let data = res.data;
                    if(data.status){
                        throw new Error(data.msg);
                    }else{
                        this.isLogined = true;
                        this.bShowLogin = false;
                        let user = data.data;
                        this.set_user(user);
                    }
                })
                .catch((err)=>{
                    console.err(err);
                    this.loginClicked = false;
                })
            },
            // 登出
            logout(e){
                if(!this.isLogined || this.logoutClicked){
                    return;
                }
                this.logoutClicked = true;
                this.$http.get(this.LOGOUT)
                .then((res)=>{
                    this.logoutClicked = false;
                    let data = res.data;
                    if(data.status){
                        console.error(data.msg);
                    }else{
                        this.isLogined = false;
                        this.bShowAccountTips = false;
                        this.clear_user();
                    }
                })
                .catch((err)=>{
                    console.err(err);
                    this.logoutClicked = false;
                })
            },
            // 从cookie中初始化用户信息
            initUserInfoFromCookie(){
                return new Promise((resolve, reject)=>{
                    ses.cookies.get({
                        'domain': this.DOMAIN, 'name': this.USER_COOKIE_NAME
                    }, (err, cookies)=>{
                        if(err){
                            reject(err);
                        }
                        if(cookies && cookies.length > 0){
                            let user = cookies[0].value;
                            if(user){
                                user = JSON.parse(user);
                                this.id = user.id;
                                this.phone = user.phone;
                                this.nickname = user.nickname;
                                resolve(true);
                            }
                        }
                        resolve(false);
                    })
                })
            },
            // get login cookie history when start app
            initGetLoginCookie(){
                return new Promise((resolve, reject)=>{
                    ses.cookies.get({'domain': this.DOMAIN, 'name': 'sessionid'},(err, cookies)=>{
                        if(err){
                            reject(err);
                        }
                        if(cookies && cookies.length > 0){
                            resolve(cookies[0]);
                        }else{
                            resolve(null);
                        }
                    })
                })
            },
            // 同步执行登陆判断
            syncMounted: async function() {
                // 是否已登陆
                let oldCookie = await this.initGetLoginCookie();
                if(oldCookie){
                    this.isLogined = true;
                    this.initUserInfoFromCookie();
                }else{
                    this.isLogined = false;
                }
            },
            // 异步执行登陆判断
            asyncMounted(){
                ses.cookies.get({'domain': this.DOMAIN, 'name': 'sessionid'},(err, cookies)=>{
                    if(err){
                        console.error(err);
                    }
                    if(cookies && cookies.length > 0){
                        ses.cookies.get({
                            'domain': this.DOMAIN, 'name': this.USER_COOKIE_NAME
                        }, (err, userCookies)=>{
                            if(err){
                                console.error(err);
                            }
                            if(userCookies && userCookies.length > 0){
                                let user = userCookies[0].value;
                                if(user){
                                    user = JSON.parse(user);
                                    this.id = user.id;
                                    this.phone = user.phone;
                                    this.nickname = user.nickname;

                                    this.isLogined = true;
                                }
                            }
                        })
                    }else{
                        this.isLogined = false;
                    }
                })
            },
        },
        updated () {

        },
        mounted() {
            this.asyncMounted();
        },
    }
</script>

<style lang="" scoped>
.account-img {
    width: 36px;
    height: 50px;
    line-height: 50px;
    float: right;
    position: relative;
}
.account-img > img {
    width: 32px;
    height: 32px;
}
.account-img > img:hover{
    cursor: pointer;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 6px rgba(0,113,241,1);
}
.account-img > img:active{
    border-radius: 3px;
    -webkit-box-shadow: 0 0 6px rgba(0,0,241,1);
}
.account-tips {
    position: absolute;
    left: -260px;
    bottom: -300px;
    width: 260px;
    height: 300px;
    border: 1px solid #B3C0D1;
    z-index: 2;
    background: #e9eef3;
}
.login{
    position: absolute;;
    width: 300px;
    height: 500px;
    border: 1px solid #B3C0D1;
    top: 100px;
    left: 40%;
    z-index: 2;
    background: #e9eef3;
}
.register{
    position: absolute;
    top: 30%;
    left: 60px;
    line-height: 36px;
}
.register-main-row{
    margin-top: 5px;
    width: 180px;
    height: 36px;
    border: 2px solid #f5441c;
    border-radius: 20px;
    font-weight: 600;
    color: #f5441c;
    cursor: default;
}
.register-row:hover{
    -webkit-box-shadow: 0 0 6px rgba(230,97,67,1);
}
.loginup{
    position: absolute;
    top: 30%;
    left: 0px;
    line-height: 36px;
}
.loginup-row{
    margin-top: 0px;
    width: 240px;
    height: 40px;
    cursor: default;
    /* border: 2px solid #f5441c; */
    text-align: left;
    display: inline-block;
    text-align: left;
    line-height: 40px;
}
.loginup-row-img{
    height: 26px;
}
.register-row:active{
    background-color: rgba(230,97,67,0.2);
}
.close-login{
    position: absolute;
    left: 3px;
    top: 3px;
    width: 22px;
    height: 22px;
}
.loginup-btn-row{
    width: 100%;
}
.btn-loginup{
    position: relative;
    top: 20px;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
    color: #ef1b1b;
    border: 2px solid #ef1b1b;
    background: #fff;
}
.logBtnClicked{
    background-color: rgba(230,97,67,1) !important;
    -webkit-box-shadow: 0 0 6px rgba(230,97,67,1);
}
.btnDisabled{
    background-color: #666 !important;
}
</style>
