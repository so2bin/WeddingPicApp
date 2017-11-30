<template lang="">
<div class="step1">
    <el-container class="step1-container">
        <el-main class="step1-main">

        </el-main>
        <el-aside class="step1-aside" width="37%">
            <div class="step1-row">
                <span class="aside-tips">项目名称：</span>
                <el-input v-model="pro_name" placeholder="请输入内容" size="small" style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step1-row">
                <span class="aside-tips">项目尺寸：</span>
                <el-select v-model="sel_val" placeholder="请选择" size="small" style="width:120px; height:40px; line-height:40px;">
                    <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="step1-row">
                <template>
                    <el-radio v-model="bInsertQRCode" label="1">使用二维码</el-radio>
                    <el-radio v-model="bInsertQRCode" label="2">不用二维码</el-radio>
                </template>
            </div>
        </el-aside>
        </el-container>
    </div>
</template>

<script lang="">
export default {
    data() {
        return {
            sel_val: null,
            pro_name: '',
            options: [{
                    label: "规格一",
                    value: 1
                },
                {
                    label: "规格二",
                    value: 2
                }
            ],
            bInsertQRCode: '1',
        }
    }
}
</script>

<style lang="" scoped>
.step1 {
    padding: 10px 0px;
}

.step1-container {
    height: 430px;
}

.step1-main {
    margin-right: 3px;
    border: 1px solid #A5A060;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    padding: 10px;
}

.step1-aside {
    padding: 10px 0px;
    border: 1px solid #A5A060;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    line-height: 40px;
}

.step1-aside .aside-tips {
    float: left;
    padding-left: 18px;
}

.step1-aside .step1-row {
    width: 100%;
    line-height: 40px;
    height: 40px;
}
</style>
