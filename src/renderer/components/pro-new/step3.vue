<template lang="">
<div class="step2">
    <el-container class="step2-container">
      <el-container>
        <el-main class="step2-main">
          <wxindex></wxindex>
        </el-main>
        <el-footer style="line-height:24px; height:68px;">
          <div class="img-input text-overflow" style="padding-top:3px; padding-bottom:0px;">
            <span>
              <input type="file" id="fileElem1" accept="image/*" style="display:none" @change="select_back_img(1)">
              <label for="fileElem1" class='bkImg-btn'>
                <i class="el-icon-picture"></i>背景一：
              </label>
              <input type="text" class="back-img-tips" :value="img1Path"/>
            </span>
          </div>
          <div class="img-input text-overflow" style="padding-top:0px; padding-bottom:3px;">
            <span>
              <input type="file" id="fileElem2" accept="image/*" style="display:none" @change="select_back_img(2)">
              <label for="fileElem2" class='bkImg-btn'>
                <i class="el-icon-picture"></i>背景二：
              </label>
              <input type="text" class="back-img-tips" :value="img2Path"/>
            </span>
          </div>
        </el-footer>
      </el-container>
        <el-aside class="step2-aside" width="37%">
            <div class="step2-row">
                <span class="aside-tips">项目标题：</span>
                <el-input v-model="pro_title" placeholder="请输入内容" size="small"
                style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step2-row">
                <span class="aside-tips">摄影师&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                <el-input v-model="pro_author" placeholder="请输入内容" size="small"
                style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step2-row">
                <span class="aside-tips">联系电话：</span>
                <el-input v-model="pro_phone" placeholder="请输入内容" size="small"
                style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step2-row">
                <span class="aside-tips">公司名称：</span>
                <el-input v-model="pro_company" placeholder="请输入内容" size="small"
                style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step2-row">
                <span class="aside-tips">公司地址：</span>
                <el-input v-model="pro_company" placeholder="请输入内容" size="small"
                style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
        </el-aside>
    </el-container>
</div>
</template>

<script lang="">
import wxindex from './wx-template/wx-index.vue'
export default {
  components:{
    wxindex
  },
  data () {
    return {
      bkImg1: null,
      pro_title: "",
      pro_author:"",
      pro_phone:"",
      pro_company:"",
      img1Path:"",
      img2Path: ""
    }
  },
  computed: {

  },
  methods: {
    select_back_img(type) {
      let img = event.currentTarget.files[0]
      console.log(img.path)
      if(type === 1){
        this.img1Path = img.path
      }else{
        this.img2Path = img.path
      }
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
    line-height: 36px;
}

.step2-aside .aside-tips {
    float: left;
    padding-left: 18px;
    font-weight: 600;
}

.step2-aside .step2-row {
    width: 100%;
    line-height: 36px;
    height: 36px;
}

.el-footer{
  position: relative;
}
.img-input{
  height:30px;
  display:inline-block;
}
.bkImg-btn{
  border: 1px solid #A5A060;
  background-color: rgba(15, 120, 228, 0.36);
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  padding: 0px;
  align: center;
  line-height: 26px;
  font-size: 14px;
  font-weight:600;
  position: absolute;
  left: 30px;
  margin-bottom: 0px;
}

.text-overflow{
  width:31em;
  word-break:keep-all;           /* 不换行 */
  white-space:nowrap;          /* 不换行 */
  overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.back-img-tips{
  font-size:12px;
  height:30px;
  background-color: #dee3ea;
  border-width: 0px;
  width: 60%;
  position: absolute;
  left: 120px;
}
</style>
