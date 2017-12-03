<template lang="">
  <div class="wx-index">
      <input type="file" id="bkImg1Elem" accept="image/*" style="display:none"
       @change="sel_bkImg">
      <label for="bkImg1Elem">
        <i class="el-icon-plus bk-img-icon" v-show="!isBkImgLoaded"></i>
        <img class="bk-img" :src="bkimg" alt="" v-bind:class='{"img-half-opacity": !isBkImgLoaded}'>
      </label>
  </div>
</template>

<script>
import wxindexHeader from './wx-header.vue'
export default {
  components: {
    wxindexHeader
  },
  data(){
    return {
      bkimg: "/static/img/背景图片1.jpg",
      bLoaded: false,
    }
  },
  computed: {
    isBkImgLoaded(){
      return this.bkimg && this.bkimg!=="" && this.bLoaded
    },
  },
  // props: ['bkimg'],
  methods: {
    sel_bkImg() {
      let img = event.currentTarget.files[0]
      console.log(img.path)
      this.bkimg = img.path
      if(img.path && img.path!==''){
        this.bLoaded = true
      }else{
        this.bLoaded = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
.img-half-opacity{
  opacity: 0.32
}
.wx-index{
  border: 1px solid;
  height: 100%;
  border-color: #d3dce6;
  position: relative;
}
.bk-img{
  position: absolute;
  left:0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
}
.bk-img:hover{
  cursor: pointer;
  border: 1px solid #0d85ce;
}
.bk-img-icon{
  position: absolute;
  left:50%;
  top:50%;
  font-size: 28px;
  z-index: 100;
  color: #0d85ce;
  font-weight: 800;
}
</style>
