<template lang="">
<div class="bodypage">
    <h2 class="help-title">朝歌婚姻相册系统<span style="font-size:16px;">v1.0</span></h2>
    <div class="pic-show">
        <el-row style="height:200px;">
            <el-col style="line-height:18px;" :span="10" v-for="(item, idx) in datalist" :key="idx" :offset="idx > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.imgDemoUrl" class="image">
                    <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script lang="">
export default {
  data () {
    return {
      currentDate: new Date(),
      datalist: [
        {imgDemoUrl: 'http://www.twgreatdaily.com/imgs/image/105/10588367.jpg'},
        {imgDemoUrl: 'http://www.twgreatdaily.com/imgs/image/105/10588367.jpg'}
      ]
    }
  }
}
</script>

<style lang="" scoped>
.help-title {
    height:40px;
    line-height:40px;
    margin:0 0px;
}
.pic-show{
    height: 500px;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
