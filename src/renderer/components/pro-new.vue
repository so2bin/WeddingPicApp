<template lang="">
<div class="pro-new">
    <!-- 步骤组件 -->
    <el-steps :space="100" :active="step" :align-center="true" class="step">
        <el-step title="步骤一" description="基础设置"></el-step>
        <el-step title="步骤二" description="图片设置"></el-step>
        <el-step title="步骤三" description="微信设置"></el-step>
        <el-step title="步骤四" description="打印设置"></el-step>
        <el-step title="步骤五" description="容量选择"></el-step>
        <el-step title="完成" description=""></el-step>
    </el-steps>

    <!-- 视图 -->
    <!-- <transition name="fade"> -->
        <router-view class="view"></router-view>
    <!-- </transition> -->

    <div class="but-group">
        <el-button @click.native.prevent="handlePreview" v-show="preview">预览</el-button>
        <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
        <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
        <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布</el-button>
    </div>
</div>
</template>

<script lang="">
import $ from 'jquery'
export default {
  name: 'pro-new',
  data: function () {
    return {
      isRouter: false,
      preview: false,
      preStep: false,
      nextStep: true,
      publish: false,
      step: 1
    }
  },
  methods: {
    handlePreview: function () {
      console.log('预览')
    },
    handlePreStep: function () {
      this.$router.go(-1)
      this.step--
      this.goStep(this.step)
      $('html,body').animate({
        scrollTop: 0
      }, 500)
    },
    handleNextStep: function () {
      this.$router.push('/pronew/step' + (this.step + 1))
      var _this = this
      setTimeout(function () {
        if (_this.isRouter) {
          _this.step++
          _this.goStep(_this.step)
        }
      })
      $('html,body').animate({
        scrollTop: 0
      }, 100)
    },
    handlePublish: function () {
      console.log('发布')
    },
    goStep: function (n) {
      switch (n) {
        case 1:
          this.preview = false
          this.preStep = false
          this.nextStep = true
          this.publish = false
          break
        case 2:
          this.preview = false
          this.preStep = true
          this.nextStep = true
          this.publish = false
          break
        case 3:
          this.preview = false
          this.preStep = true
          this.nextStep = true
          this.publish = false
          break
        case 4:
          this.preview = false
          this.preStep = true
          this.nextStep = true
          this.publish = false
          break
        case 5:
          this.preview = false
          this.preStep = true
          this.nextStep = true
          this.publish = false
          break
        case 6:
          this.preview = true
          this.preStep = true
          this.nextStep = false
          this.publish = true
          break
      }
    }
  },
  watch: {
    '$route': function (to, from) {
      this.isRouter = true
    }
  }
}
</script>

<style lang="" scoped>
.pro-new .router-link {
    color: #fff;
}

.pro-new .but-group .el-button {
    margin-right: 20px;
}
</style>
