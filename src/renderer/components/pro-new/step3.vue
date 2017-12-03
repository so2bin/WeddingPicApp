<template lang="">
<div class="step2">
    <el-container class="step2-container">
      <el-container>
        <el-main class="step2-main">
          <div class="wxpic wxpic-left">
            <wxindexLeft></wxindexLeft>
          </div>
          <div class="wxpic wxpic-right">
            <wxindexRight :pro_obj="obj"></wxindexRight>
          </div>
        </el-main>
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
                <el-input v-model="pro_company_addr" placeholder="请输入内容" size="small"
                style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
        </el-aside>
    </el-container>
</div>
</template>

<script lang="">
import wxindexLeft from './wx-template/wx-index-left.vue'
import wxindexRight from './wx-template/wx-index-right.vue'
import {mapState} from 'vuex';

export default {
  components:{
    wxindexLeft,
    wxindexRight
  },
  props: ['pro_obj'],
  data () {
    return {
      bkImg1: null,
    }
  },
  computed: {
    obj(){
      return {
        pro_title: this.pro_title,
        pro_author: this.pro_author,
        pro_phone: this.pro_phone,
        pro_company: this.pro_company,
        pro_company_addr: this.pro_company_addr,
      }
    },
    pro_title: {
      get(){
        return this.$store.state.ProNew.step3.pro_title
      },
      set(val){
        this.change_pro_info('title', val)
      }
    },
    pro_author: {
      get(){
        return this.$store.state.ProNew.step3.pro_author
      },
      set(val){
        this.change_pro_info('author', val)
      }
    },
    pro_phone: {
      get(){
        return this.$store.state.ProNew.step3.pro_phone
      },
      set(val){
        this.change_pro_info('phone', val)
      }
    },
    pro_company: {
      get(){
        return this.$store.state.ProNew.step3.pro_company
      },
      set(val){
        this.change_pro_info('company', val)
      }
    },
    pro_company_addr: {
      get(){
        return this.$store.state.ProNew.step3.pro_company_addr
      },
      set(val){
        this.change_pro_info('company_addr', val)
      }
    }
  },
  methods: {
    change_pro_info(type, val){
      this.$store.commit('set_step3_pro', {type, val})
    }
  },
  watch: {

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
    /*position: relative;*/
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
.wxpic{
  height: 97%;
  width: 47%;
  display: inline-block;
  vertical-align: middle
}
.wxpic-left{
  position: relative;;
}
</style>
