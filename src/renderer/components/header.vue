<template lang="">
    <div class="header" style="-webkit-app-region: drag;">
        <div class="account-img">
            <img src="/static/img/icons/account.svg" alt="" @click="openLogin"
                v-on:mouseenter="showAcctTipsToggle(true)" v-on:mouseleave="showAcctTipsToggle(false)">
            <div class="account-tips" v-show="bShowAccountTips">

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
                        <el-input placeholder="验证码"
                            v-model="code" size="medium">
                        </el-input>
                    </div>
                    <div class="loginup-btn-row">
                        <input type="button" name="注册" value="注册" id="btn-loginup"
                        v-bind:class="{logBtnUnactive: unactive}" v-on:click="loginup">
                    </div>
                </div>
            </div>
            <div class="" v-show="loginCtl.useLogin">
                <img src="/static/img/icons/close.svg" alt="" class="close-login" @click="closeLogin(2)">
                <div class="register">
                    <div class="register-main-row">用户名</div>
                    <div class="register-main-row">密码</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="">
    export default {
        data() {
            return {
                bShowAccountTips: false,   // 用户信息小卡片图
                bShowLogin: false,  // 登录界面
                loginCtl: {
                    useMain: true,
                    useRegister: false,
                    useLogin: false
                },
                phone: "",
                passwd: "",
                code: "",
                unactive: false,
                LOGINUP: this.$store.state.conf.LOGINUP
            }
        },
        methods: {
            showAcctTipsToggle(val){
                this.bShowAccountTips = val;
            },
            openLogin(){
                this.bShowLogin = !this.bShowLogin;
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
                this.unactive = true;
                this.$http.post(this.LOGINUP, {
                    phone: this.phone,
                    code: this.code,
                    password: this.passwd
                })
                .then((res)=>{
                    let data = res.data
                    if(data.status){
                        console.error(data.msg);
                    }
                    this.unactive = false;
                })
                .catch((err)=>{
                    console.log(err);
                    this.unactive = false;
                })
            }
        }
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
    left: 30px;
    line-height: 36px;
}
.loginup-row{
    margin-top: 5px;
    width: 240px;
    height: 36px;
    cursor: default;
    /* border: 2px solid #f5441c; */
    text-align: left;
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
#btn-loginup{
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
.logBtnUnactive{
    background-color: rgba(230,97,67,1) !important;
    -webkit-box-shadow: 0 0 6px rgba(230,97,67,1);
}
</style>
