<template lang="">
<div class="pro-new">
    <!-- 步骤组件 -->
    <el-steps :space="150" :active="step" :align-center="true" class="step">
        <el-step title="步骤一" description=""></el-step>
        <el-step title="步骤二" description=""></el-step>
        <el-step title="步骤三" description=""></el-step>
        <el-step title="步骤四" description=""></el-step>
    </el-steps>

    <!-- 视图 -->
    <transition name="fade">
        <router-view class="view"></router-view>
    </transition>

    <div class="but-group">
        <el-button @click.native.prevent="handlePreview" v-show="preview">预览</el-button>
        <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
        <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
        <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布活动</el-button>
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
      preview: true,
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
      }, 500)
    },
    handlePublish: function () {
      console.log('发布')
    },
    goStep: function (n) {
      switch (n) {
        case 1:
          this.preview = true
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
