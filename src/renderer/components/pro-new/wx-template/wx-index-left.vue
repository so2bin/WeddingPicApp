<template lang="">
  <div class="wx-index">
      <img :src="bkimg" alt="" style="height:100%;width:100%;">
  </div>
</template>

<script>

export default {
  data(){
    return {
      // bkimg: ""
    }
  },
  props: ['bkimg'],
}
</script>

<style lang="css" scoped>
.wx-index{
  border: 1px solid;
  height: 100%;
  border-color: #d3dce6;
}
</style>
