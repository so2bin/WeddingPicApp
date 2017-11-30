<template lang="">
    <div class="step1">
        <el-container class="step1-container">
            <el-main class="step1-main">

            </el-main>
            <el-aside class="step1-aside" width="30%">
                <span>项目名称</span> <input type="text" name="pro_name" value="xxx">
            </el-aside>
        </el-container>
    </div>
</template>

<script lang="">
    export default {
    }
</script>

<style lang="" scoped>
    .step1 {
        padding: 10px 0px;
    }
    .step1-container {
        height: 360px;
    }
    .step1-main {
        margin-right: 3px;
        border: 1px solid #A5A060;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
    }
    .step1-aside {
        border: 1px solid #A5A060;
        box-shadow: rgba(0,0,0, 0.1) 0px 0px 8px;
        -moz-box-shadow: rgba(0,0,0, 0.1) 0px 0px 8px;
        -webkit-box-shadow: rgba(0,0,0, 0.1) 0px 0px 8px;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
    }
</style>
