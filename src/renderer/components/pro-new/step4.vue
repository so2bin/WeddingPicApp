<template lang="">
    <div class="step4">
        <div class="step4-main-upper">
          <div class="img-folders">
            <span class="img-folders-item">
              原始目录：
            </span>
            <input type="file" id="imgFolderOrigin" webkitdirectory directory  style="display:none"
             @change="sel_origin_folder">
            <input type="text" name="" value="" :value="originImgPath">
            <label for="imgFolderOrigin">
              <img src="/static/img/icons/folder.svg" alt="">
            </label>
          </div>
          <div class="img-folders">
            <span class="img-folders-item">
              备份目录：
            </span>
            <input type="file" id="imgFolderCopy" webkitdirectory directory  style="display:none"
             @change="sel_origin_folder">
            <input type="text" name="" value="" :value="copyImgPath">
            <label for="imgFolderCopy">
              <img src="/static/img/icons/folder.svg" alt="">
            </label>
          </div>
          <div class="img-folders">
            <span class="img-folders-item">
              合成目录：
            </span>
            <input type="file" id="imgFolderComposed" webkitdirectory directory  style="display:none"
             @change="sel_origin_folder">
            <input type="text" name="" value="" :value="composedImgPath">
            <label for="imgFolderComposed">
              <img src="/static/img/icons/folder.svg" alt="">
            </label>
          </div>
        </div>
        <div class="step4-main-lower">
          <div class="main-lower-tips">
            <span>打印机列表</span>
          </div>
          <div class="printer-list">

          </div>
        </div>
    </div>
</template>

<script lang="">
import electron from 'electron'

let ipcRenderer = electron.ipcRenderer
ipcRenderer.send('printer-list', true)
console.log('send printer-list true')
ipcRenderer.on('printer-list', (e, args)=>{
  console.log('return from main, args:', args)
})
    export default {
      data(){
        return {
          originImgPath: "",
          copyImgPath: "",
          composedImgPath: ""
        }
      },
      methods: {
        sel_origin_folder(){
          let trgtId = event.target.id
          let selPath = event.currentTarget.files[0]
          if(!selPath){
            return
          }
          if(trgtId == 'imgFolderOrigin'){
            this.originImgPath = selPath.path
          }else if(trgtId == 'imgFolderCopy'){
            this.copyImgPath = selPath.path
          }else if(trgtId == 'imgFolderComposed'){
            this.composedImgPath = selPath.path
          }
        }
      }
    }
</script>

<style lang="" scoped>
.step4{

}
.step4-main-upper{
  width: 100%;
  height: 120px;
  border: 1px solid;
  padding: 5px 5px;
}
.step4-main-upper .img-folders{
  text-align: left;
}
.img-folders-item{
  font-size: 20px;
  font-weight: 500;
  padding-left: 5px;
}
.img-folders > label >  img{
  width: 22px;
  height: 18px;
  position: relative;
  top: -1px;
  left:8px;
  cursor: pointer;
  background-color: #f3f3c9;
  border-radius: 3px;
}
.img-folders > input[type='text']{
  height: 22px;
  max-width: 300px;
  width: 60%;
  background-color: #f7f7f7;
  border-width: 0px;
}
.main-lower-tips{
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  padding-left: 5px;
}
</style>
