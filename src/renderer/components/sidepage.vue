<template lang="">
    <div class="nav">
        <el-col :span="24">
            <div class="nav-tip">
                <p>导航栏</p>
            </div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="rgb(211, 220, 230)"
            text-color="#455667"
            active-text-color="#f94239"
            router>
            <el-menu-item index="/bodypage" style="padding-left:5px;">
              <i class="el-icon-star-on"></i>
              <span slot="title" class="router-nav">首页</span>
            </el-menu-item>
            <el-menu-item index="/pronew" style="padding-left:5px;" @click.native="clickNew">
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title" class="router-nav">新建</span>
            </el-menu-item>
            <el-menu-item index="/help" style="padding-left:5px;">
              <i class="el-icon-question"></i>
              <span slot="title" class="router-nav">关于</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
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
        clickNew(e){
            this.step = 1;
        },
      handleOpen (key, keyPath) {
        console.log('5555', key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="" scoped>
    .el-menu-item {
        width: 80px;
        min-width: 80px;
    }
    .el-submenu__title {
        padding-left: -0px !important;
    }
    .nav-tip > p {
        font-weight: bold;
        line-height: 60px;
        margin: 0 0px;
        color: #455667;
    }
    .router-nav {
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        position: relative;
        left: -8px;
    }

</style>
