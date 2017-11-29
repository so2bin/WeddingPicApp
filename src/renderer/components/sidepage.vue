<template lang="">
    <div class="nav">
        <el-col :span="24">
            <div class="nav-tip">
                <p>功能导航栏</p>
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
            <el-menu-item index="/bodypage" style="padding-left:0px;">
              <i class="el-icon-star-on"></i>
              <span slot="title" class="router-nav">首页</span>
            </el-menu-item>
            <el-menu-item index="/pronew" style="padding-left:0px;" >
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title" class="router-nav">新建</span>
            </el-menu-item>
            <el-menu-item index="/help" style="padding-left:0px;">
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
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="" scoped>
    .el-menu-item {
        width: 100%;
        min-width: 100px;
    }
    .el-submenu__title {
        padding-left: -50px !important;
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
        /*color: #455667;*/
    }

</style>
