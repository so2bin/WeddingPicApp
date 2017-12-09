<template lang="">
<div class="step2">
    <el-container class="step2-container">
        <el-main class="step2-main">
            <div class="origin-img">
                <img :src="origImg" alt="" @load="origImgLoaded" id="origImg">
            </div>
            <div class="processed-img">
                <img :src="processedImg" alt="" id="processedImg">
            </div>
        </el-main>
        <el-aside class="step2-aside" width="37%">
            <div class="step2-row">
                <span class="aside-tips">项目名称：</span>
                <el-input v-model="pro_name" placeholder="请输入内容" size="small" style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
              <div class="pic-filter">
                  <div class="pic-filter-blightness">
                    <div class="block">
                      <span class="demonstration">亮度: {{ v_blight }}</span>
                      <el-slider v-model="val_fltr_blight" @change="filte_bc_img"></el-slider>
                      <span class="demonstration">对比度: {{ v_contrast }}</span>
                      <el-slider v-model="val_fltr_contrast" @change="filte_bc_img"></el-slider>
                    </div>
                  </div>
              </div>
        </el-aside>
    </el-container>
</div>
</template>

<script lang="">
import fx from 'glfx'
export default {
  data () {
    return {
      bOrigImgLoaded: false,
      pro_name: '',
      origImg: 'http://evanw.github.io/glfx.js/media/image.jpg',
      processedImg: '',
      val_fltr_blight: 50,
      val_fltr_contrast: 50
    }
  },
  computed: {
    v_blight () { return (this.val_fltr_blight - 50) / 50 },
    v_contrast () { return (this.val_fltr_contrast - 50) / 50 }
  },
  methods: {
    //  http://www.cnblogs.com/ajg016/p/5477557.html  跨域
    filte_bc_img (val) {
      var canvas = fx.canvas()
      var origImage = document.getElementById('origImg')
      var texture = canvas.texture(origImage)
      canvas.draw(texture).brightnessContrast(this.v_blight, this.v_contrast).update()
      var processedImage = document.getElementById('processedImg')
      // processedImage.parentNode.insertBefore(canvas, processedImage);
      // processedImage.parentNode.removeChild(image);
      processedImage.src = canvas.toDataURL('image/png')
    },
    origImgLoaded () {
      this.bOrigImgLoaded = true
      console.log('origin image loaded!')
      this.filte_bc_img(0)
    },
    formatTooltip (val) {
      return val / 100
    }
  }
}
</script>

<style lang="" scoped>

.step2 {
    padding: 10px 0px;
}

.step2-container {
    height: 430px;
}

.step2-main {
    margin-right: 3px;
    border: 1px solid #A5A060;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    height: 100%;
    padding: 10px;
}

.step2-aside {
    padding: 10px 0px;
    border: 1px solid #A5A060;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    line-height: 40px;
}

.step2-aside .aside-tips {
    float: left;
    padding-left: 18px;
}

.step2-aside .step2-row {
    width: 100%;
    line-height: 40px;
    height: 40px;
}

.origin-img > img {
    height: 200px;
    width: 100%;
}

.processed-img > img {
    height: 200px;
    width: 100%;
}
</style>
