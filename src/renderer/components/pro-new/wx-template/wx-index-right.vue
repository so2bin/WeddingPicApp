<template lang="">
  <div class="wx-index">
    <div class="head-img">
      <input type="file" id="bkImg2Elem" accept="image/*" style="display:none"
       @change="sel_bkImg">
      <label for="bkImg2Elem">
        <i class="el-icon-plus bk-img-icon" v-show="!isBkImgLoaded"></i>
        <img class="bk-img" :src="bkimg" alt="" v-bind:class='{"img-half-opacity": !isBkImgLoaded}'>
      </label>
    </div>
    <div class="show-middle-text">
      <div class="show-middle-title">
        <span class="middle-title">{{ pro_obj.pro_title }}</span>
      </div>
      <div class="show-middle-buttons">
        <span class="show-btn-all">
          <i class="el-icon-menu"></i>
          <span style="position:relative;left:-3px;">全部</span>
        </span>
        <span class="show-btn-order">
          <i class="el-icon-sort"></i>
          <span style="position:relative;left:-5px;">排序</span>
        </span>
      </div>
    </div>
    <div class="show-img-list">
      <img src="/static/img/背景图片3.jpg" alt="">
    </div>
    <div class="show-project-infos">
        <div class="show-project-row">
            <span class="pro-info-item">摄影师：</span>
            <span class="project-infos-val">{{ pro_obj.pro_author }}</span>
        </div>
        <div class="show-project-row">
            <span class="pro-info-item">联系电话：</span>
            <span class="project-infos-val">{{ pro_obj.pro_phone }}</span>
        </div>
        <div class="show-project-row">
            <span class="pro-info-item">摄影公司：</span>
            <span class="project-infos-val">{{ pro_obj.pro_company }}</span>
        </div>
        <div class="show-project-row">
            <span class="pro-info-item">公司地址：</span>
            <span class="project-infos-val">{{ pro_obj.pro_company_addr }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import wxindexHeader from './wx-header.vue'
export default {
  components: {
    wxindexHeader
  },
  props: ['pro_obj'],
  data(){
    return {
      bkimg: "/static/img/背景图片2.jpg",
      bLoaded: false
    }
  },
  computed: {
    isBkImgLoaded(){
      return this.bkimg && this.bkimg!=="" && this.bLoaded
    },
  },
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
  height: 120px;
  width: 100%;
}
.bk-img:hover{
  cursor: pointer;
  border: 1px solid #0d85ce;
}
.bk-img-icon{
  position: absolute;
  left:50%;
  top: 60px;
  font-size: 28px;
  font-weight: 800;
  z-index: 100;
  color: #0d85ce;
}
.head-img {
  height: 120px;
}
.show-middle-text {
  height: 55px;
}
.show-middle-title{
  height: 30px;
  position: relative;
  background-color: #f0f3f7;
}
.show-middle-title .middle-title {
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  left: 3px;
  line-height: 30px;
}
.show-middle-buttons{
  border-top: 1px solid #c8d8e8;
  height: 20px;
  position: relative;
}
.show-middle-buttons .show-btn-all{
  position: absolute;
  left: 5px;
  background-color: #e9eef3;
  font-size: 13px;
  line-height: 20px;
}
.show-middle-buttons .show-btn-order{
  position: absolute;
  right: 3px;
  background-color: #e9eef3;
  font-size: 13px;
  line-height: 20px;
}
.show-img-list {
  height: 100px;
  vertical-align: center;
}
.show-img-list > img{
  height: 100px;
  width: 100%;
}
.show-project-infos{
  width: 100%;
  text-align: left;
  padding-top: 5px;
}
.show-project-row{
  line-height: 18px;
  font-size: 13px;
  font-weight: 500;
  width: 100;
  padding-left: 8px;
}
.show-project-row .pro-info-item{
}
</style>
