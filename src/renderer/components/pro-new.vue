<template lang="">
<div class="pro-new">
    <!-- 步骤组件 -->
    <el-steps  :active="step" finish-status='success' simple class="step">
        <el-step title="基础" ></el-step>
        <el-step title="图片" ></el-step>
        <el-step title="微信" ></el-step>
        <el-step title="打印" ></el-step>
        <el-step title="容量" ></el-step>
        <el-step title="完成" ></el-step>
    </el-steps>

    <!-- 视图 -->
    <!-- <transition name="fade"> -->
        <router-view class="view">
            <span slot='test'>
                <div class="but-group" style="text-align:center;">
                    <el-button @click.native.prevent="handlePreStep" v-show="preStep" size='mini'>上一步</el-button>
                    <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary" size='mini'>下一步</el-button>
                    <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary" size='mini'>创建</el-button>
                </div>
            </span>
        </router-view>
    <!-- </transition> -->
</div>
</template>

<script lang="">
import $ from 'jquery';
const ses = require('electron').remote.getCurrentWebContents().session;
import { ipcRenderer } from 'electron'
import {uploadImg, uploadToSOC} from '../../tools/uploadimg'
import {randomInt} from '../../tools/uufile'

export default {
  name: 'pro-new',
  data: function () {
    return {
        isRouter: false,
        preStep: false,
        nextStep: true,
        publish: false,

        DOMAIN: this.$store.state.conf.DOMAIN,
        SUITE_CREATE: this.$store.state.conf.SUITE_CREATE,
        BACKIMG_SUITEID: this.$store.state.conf.BACKIMG_SUITEID,
        HTTP_RE: /^http:\/\/.+/,
    }
  },
  computed: {
      suiteObj() {
          return {
              title: this.$store.state.ProNew.step1.proName,
              main_img: this.$store.state.ProNew.step3.main_img,
              head_img: this.$store.state.ProNew.step3.head_img,
              suite_type: 0,
          }
      },
      csrftoken(){
          return this.$store.state.user.csrftoken;
      },
      step: {
          get (){
              return this.$store.state.ProNew.step;
          },
          set(val){
              this.set_proj('step', val);
          }
      },
      user: {
          get(){
              return this.$store.state.user;
          }
      }
  },
  methods: {
    // 获取csrf
    initCsrf: async function(){
        await new Promise((resolve, reject)=>{
            ses.cookies.get({
                domain: this.DOMAIN, name: 'csrftoken'
            }, (err, cookies)=>{
                if(err){
                    reject(err);
                }
                if(cookies && cookies.length > 0){
                    let csrf = cookies[0].value;
                    this.$store.commit('set_csrf', csrf);
                    resolve(csrf);
                }else{
                    resolve(null);
                }
            })
        });
    },
    set_proj(type, val){
        this.$store.commit('set_pronew', {type, val})
    },
    handlePreview: function () {
      console.log('预览')
    },
    handlePreStep: function () {
      this.$router.go(-1)
      this.step--;
      this.goStep(this.step)
      $('html,body').animate({
        scrollTop: 0
      }, 500)
    },
    handleNextStep: function () {
      this.$router.push('/pronew/step' + (this.step + 1));
      // if (this.isRouter) {
        if(this.step + 1 < 6){
            this.step++;
        }
          this.goStep(this.step)
      // }
      $('html,body').animate({
        scrollTop: 0
      }, 100)
    },
    // 检查图片本地图片还是网络图片
    testHttpImg(imgUrl){
        let imgAddr = imgUrl.replace(/^\s+/, '');
        if(this.HTTP_RE.test(imgAddr)){
            return true;
        }else{
            return false;
        }
    },
    // 获取图片url，如果是本地则先上传再返回
    uploadImg: async function(imgUrl){
        if(!this.testHttpImg(imgUrl)){
            // 上传照片
            let ret = await uploadToSOC(this.user.id, this.BACKIMG_SUITEID, imgUrl, randomInt());
            return ret.url;
        }else{
            return imgUrl;
        }
    },
    createSuite(data){
        return this.$http({
            method: 'POST',
            url: this.SUITE_CREATE,
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            data: data
        })
            .then((res)=>{
                let response = res.data;
                if(response.status){
                    throw new Error(response.msg);
                }else{
                    // success
                    console.log('创建相册成功 ', response.data);
                    return response.data;
                }
            })
            .catch((err)=>{
                console.error('相册创建失败：', err);
                return null;
            })
    },
    // 创建相册并上传模板图
    handlePublish: async function () {
        if(!this.user.id){
            console.error('请先登陆');
        }
        if(!(this.suiteObj.main_img && this.suiteObj.head_img)){
            console.error('背景模板不能为空！');
            return;
        }
        let main_img = await this.uploadImg(this.suiteObj.main_img);
        let head_img = await this.uploadImg(this.suiteObj.head_img);
        let ret = await this.createSuite({
            title: this.suiteObj.title,
            main_img: main_img,
            head_img: head_img,
            suite_type: this.suiteObj.suite_type
        });
        this.$router.push({
            name: 'work',
            params: {
                suiteId: ret.id,
                title: ret.title,
                main_img: ret.main_img,
                head_img: ret.head_img,
            }
        });
    },
    goStep: function (n) {
      switch (n) {
        case 1:
          this.preStep = false;
          this.nextStep = true;
          this.publish = false;
          break
        case 2:
          this.preStep = true;
          this.nextStep = true;
          this.publish = false;
          break
        case 3:
          this.preStep = true;
          this.nextStep = true;
          this.publish = false;
          break
        case 4:
          this.preStep = true;
          this.nextStep = true;
          this.publish = false;
          break
        case 5:
          this.preview = false;
          this.preStep = true;
          this.nextStep = false;
          this.publish = true;
          break
        // case 6:
        //   this.preview = true;
        //   this.preStep = true;
        //   this.nextStep = false;
        //   this.publish = true;
        //   break
      }
    },
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
          vm.step = 1;
          vm.initCsrf();
      })
  },
  watch: {
    '$route': function (to, from) {
      this.isRouter = true;
    }
  },
}
</script>

<style lang="" scoped>
.pro-new .router-link {
    color: #fff;
}
.step{
    height: 30px;
    background: #e9eef3;
    padding: 0px 10px;
    position: relative;
    top:-10px;
}

.pro-new .but-group .el-button {
    margin-right: 15px;
}
.el-step__title{
    font-size: 10px !important;
}
</style>
