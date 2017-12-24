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
import $ from 'jquery'
export default {
  name: 'pro-new',
  data: function () {
    return {
        isRouter: false,
        preStep: false,
        nextStep: true,
        publish: false,
    }
  },
  computed: {
      step: {
          get (){
              return this.$store.state.ProNew.step;
          },
          set(val){
              this.set_proj('step', val);
          }
      }
  },
  methods: {
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
    handlePublish: function () {
      this.$router.push('/work');
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
