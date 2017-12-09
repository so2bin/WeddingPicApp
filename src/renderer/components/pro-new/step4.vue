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
            <el-checkbox class="" v-for="(prntr, index) in printerLst" :key="index"
            @click.native="checked(index)" v-model="checkedLst[index]">
              {{ prntr }}
            </el-checkbox>
          </div>
          <el-button @click.native="gotoPrint" size="mini">自动打印</el-button>
        </div>
    </div>
</template>

<script lang="">
import { ipcRenderer } from 'electron'

    export default {
      data () {
        return {
          originImgPath: '',
          copyImgPath: '',
          composedImgPath: '',
          printerLst: [],
          checkedLst: []
        }
      },
      methods: {
        sel_origin_folder () {
          let trgtId = event.target.id
          let selPath = event.currentTarget.files[0]
          if (!selPath) {
            return
          }
          if (trgtId == 'imgFolderOrigin') {
            this.originImgPath = selPath.path
          } else if (trgtId == 'imgFolderCopy') {
            this.copyImgPath = selPath.path
          } else if (trgtId == 'imgFolderComposed') {
            this.composedImgPath = selPath.path
          }
        },
        checked (index) {
          this.checkedLst[index] = !this.checkedLst[index]
        },
        gotoPrint () {
          let template = "N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,\nP0\n";
          let printerIdx = [];
          this.checkedLst.forEach((elem, idx) => {
            if(elem===true){
              printerIdx.push(idx);
            }
          });
          let printerName = this.printerLst[printerIdx[0]];
          console.log('开始打印...')
          console.log('打印机: ', printerName)
          console.log('打印内容: ', template)
          printer.printDirect({
            data:template.replace(/barcode/, "000"),
            printer:printerName,
            type: "RAW",
            success:function(){
              console.log("printed: "+barcode_text);
            },
            error:function(err){
              console.error(err);
            }
          })
        }
      },
      created() {
        ipcRenderer.send('ipc-printer-list', true);
        ipcRenderer.on('ipc-printer-list', (event, arg) => {
          arg.forEach(elem => {
            // body...
            this.printerLst.push(elem);
            this.checkedLst.push(false);
          });
        })
      }
    }
</script>

<style lang="" scoped>
.step4{
  padding: 10px 0px;
  height: 430px;
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
