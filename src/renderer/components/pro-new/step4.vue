<template lang="">
    <div class="step4">
        <div class="step4-main-upper">
          <div class="img-folders">
            <span class="img-folders-item">
              原始目录：
            </span>
            <input type="file" id="imgFolderOrigin" webkitdirectory directory  style="display:none"
             @change="change_folder">
            <input type="text" name="" value="" :value="imgfldr_origin">
            <label for="imgFolderOrigin">
              <img src="/static/img/icons/folder.svg" alt="">
            </label>
          </div>
          <div class="img-folders">
            <span class="img-folders-item">
              备份目录：
            </span>
            <input type="file" id="imgFolderCopy" webkitdirectory directory  style="display:none"
             @change="change_folder">
            <input type="text" name="" value="" :value="imgfldr_backend">
            <label for="imgFolderCopy">
              <img src="/static/img/icons/folder.svg" alt="">
            </label>
          </div>
          <!-- <div class="img-folders">
            <span class="img-folders-item">
              合成目录：
            </span>
            <input type="file" id="imgFolderComposed" webkitdirectory directory  style="display:none"
             @change="change_folder">
            <input type="text" name="" value="" :value="imgfldr_composed">
            <label for="imgFolderComposed">
              <img src="/static/img/icons/folder.svg" alt="">
            </label>
          </div> -->
        </div>
        <div class="step4-main-lower">
          <div class="main-lower-tips">
            <span>打印机列表</span>
          </div>
          <div class="printer-list">
            <el-checkbox class="" v-for="(prntr, index) in printerLst" :key="index"
            @click.native="checked(index)" v-model="checkedLst[index]">
              {{ prntr.printerName }}
            </el-checkbox>
          </div>
          <slot name='test'></slot>
        </div>
    </div>
</template>

<script lang="">
import { ipcRenderer } from 'electron'
let fs = require('fs');
let path = require('path');

    export default {
      data () {
        return {
          PRINTHOST: 'http://127.0.0.1:7010',
          printerLst: [],
          checkedLst: []
        }
      },
      computed: {
          imgfldr_origin: {
              get() {
                  return this.$store.state.ProNew.step4.imgfldr_origin
              },
              set(val) {
                  console.log(val)
                  this.set_imgfldr_path('origin', val)
              }
          },
          imgfldr_backend: {
              get() {
                  return this.$store.state.ProNew.step4.imgfldr_backend
              },
              set(val) {
                  this.set_imgfldr_path('backend', val)
              }
          },
          imgfldr_copy: {
              get() {
                  return this.$store.state.ProNew.step4.imgfldr_copy
              },
              set(val) {
                  this.set_imgfldr_path('copy', val)
              }
          },
          imgfldr_beauty: {
              get() {
                  return this.$store.state.ProNew.step4.imgfldr_beauty
              },
              set(val) {
                  this.set_imgfldr_path('beauty', val)
              }
          },
      },
      methods: {
        change_folder () {
          let trgtId = event.target.id
          let selPath = event.currentTarget.files[0]
          if (!selPath) {
            return
          }
          if (trgtId == 'imgFolderOrigin') {
              this.set_imgfldr_path('origin', selPath.path)
          } else if (trgtId == 'imgFolderCopy') {
              this.set_imgfldr_path('copy', selPath.path)
          } else if (trgtId == 'imgFolderComposed') {
              this.set_imgfldr_path('composed', selPath.path)
          }
        },
        checked (index) {
          this.checkedLst[index] = !this.checkedLst[index]
        },
        getPrinterList() {
            this.$http.get(this.PRINTHOST + '/printerLst')
                .then((res) => {
                    this.printerLst = res.data;
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        set_imgfldr_path(type, val) {
            this.$store.commit('set_step4_imgfldr', {type, val})
        },
        // 在备份目录下建立子目录
        cre_backend_folders(){
            if(this.imgfldr_backend){
                let copySubFldr = path.join(this.imgfldr_backend, 'copy');
                let beautySubFldr = path.join(this.imgfldr_backend, 'beauty');
                fs.exists(copySubFldr, (exist) => {
                    if(!exist){
                        fs.mkdir(copySubFldr, (err)=>{
                            if(err){
                                console.error(err);
                            }else{
                                this.imgfldr_copy = copySubFldr;
                            }
                        });
                    }else{
                        this.imgfldr_copy = copySubFldr;
                    }
                });
                fs.exists(beautySubFldr, (exist) => {
                    if(!exist){
                        fs.mkdir(beautySubFldr, (err) => {
                            if(err){
                                console.error(err);
                            }else{
                                this.imgfldr_beauty = beautySubFldr;
                            }
                        });
                    }else{
                        this.imgfldr_beauty = beautySubFldr;
                    }
                });
            }
        },
      },
      created() {
        // ipcRenderer.send('ipc-printer-list', true);
        // ipcRenderer.on('ipc-printer-list', (event, arg) => {
        //   arg.forEach(elem => {
        //     // body...
        //     this.printerLst.push(elem);
        //     this.checkedLst.push(false);
        //   });
        // })
        this.getPrinterList()
    },
      beforeRouteLeave (to, from, next) {
          this.cre_backend_folders();
          next();
      },
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
  border: 1px solid #677084;
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
.printer-list{
    height: 200px;
    border: 1px solid #677084;
}
.printer-list .el-checkbox {
    display: block;
    text-align: left;
    margin: 0px;
    padding-top: 3px;
    padding-left: 3px;
}
.print-btn {
    padding: 20px 10px;
}
.print-btn .el-button{
    float: right;
}
.el-aside {
    position: relative;
}
.steps-control {
    position: absolute;
    bottom: 0px;
    text-align: center;
}
</style>
