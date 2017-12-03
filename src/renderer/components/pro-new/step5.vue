<template lang="">
    <div class="step5">
        <div class="pay-items">
          <div class="pay-col boder-right" v-model="idx" v-for="item, idx in payItems">
            <p style="font-size:16px;">{{ item.name }}</p>
            <p style="font-size:18px; font-weight=600;" v-if="item.price===0">免费</p>
            <p style="font-size:18px; font-weight=600;" v-else>¥{{ item.price }}</p>
            <div class="pay-tips">
              <p v-for="lst in item.srvlist">
                {{ lst }}
              </p>
            </div>
          </div>
        </div>
        <div class="pay-total">
        </div>
    </div>
</template>

<script lang="">
    export default {
      data(){
        return {
          payItems: [
            {
              name: '试用版',
              price: 0,
              srvlist: [
                '前10张图片免费', '支持微信下载', '微信广告', '上传图片保存1个月'
              ]
            },
            {
              name: '基础版',
              price: 30,
              srvlist: [
                '包含200张在线图片', '低至0.15元/张','支持微信下载', '微信广告', '上传图片永久保存'
              ]
            },
            {
              name: '尊享版',
              price: 80,
              srvlist: [
                '前800张在线图片', '低至0.10元/张', '支持微信下载', '微信广告', '上传图片永久保存'
              ]
            },
            {
              name: '企业版',
              price: 500,
              srvlist: [
                '前10000张在线图片', '低至0.05元/张', '支持微信下载', '微信广告', '上传图片永久保存'
              ]
            },
          ],
          idx: 0,
        }
      }
    }
</script>

<style lang="" scoped>
.step5{
  padding-top: 10px;
}
.pay-items{
  width: 100%;
  height: 220px;
  display: inline-block;
  border: 1px solid;
  border-right: none;
}
.pay-col {
  width: 25%;
  float: left;
  font-size: 13px;
  line-height: 14px;
  height: 100%;
  padding-top: 8px;
}
.boder-right{
  border-right: 1px solid;
}
.pay-tips{
  padding-top: 10px;
  line-height: 10px;
}
</style>
