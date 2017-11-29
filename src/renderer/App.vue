<template>
<div id="app">
    <el-container style="height: 600px;">
        <el-aside width="120px">
            <sidepage></sidepage>
        </el-aside>
        <el-container>
            <el-header>
                <headpage></headpage>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import sidepage from './components/sidepage.vue'
import bodypage from './components/bodypage.vue'
import headpage from './components/header.vue'

export default {
  name: 'weddingapp',
  components: {
    sidepage,
    bodypage,
    headpage
  },
  data () {
    return {}
  }
}
</script>

<style>
#app {
    color: #455667;
}
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

</style>
