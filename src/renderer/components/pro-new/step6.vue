<template lang="">
    <div class="step6">
        <div class="step6-main">
            <div class="main-before-process-list">
                <!-- D:\照片\通信研究生毕业合照（大合照+各班合照） -->
                <!-- <span class="befor-process-img-small">
                    <img :src="item" alt="" v-for="(item, idx) in imglstOrigin">
                </span> -->
                <div class="befor-process-img-small">
                    <img :src="curShowImg" alt="">
                </div>
            </div>
            <div class="main-printing-list">
                <div class="printing-list-elem"
                :class="{printed: item.bUsed}"
                v-for="(item, idx) in imglstCopy">
                    {{ item.fileName }}
                </div>
            </div>
        </div>
        <input type="button" name="" value="下载" @click="download">
    </div>
</template>

<script lang="">
let fs = require('fs')
let path = require('path')
import { ipcRenderer } from 'electron'
import fx from 'glfx'

    export default {
        data() {
            return {
                imgfldrOrigin: this.$store.state.ProNew.step4.imgfldr_origin,
                imgfldrCopy: this.$store.state.ProNew.step4.imgfldr_copy,
                imgfldrComposed: this.$store.state.ProNew.step4.imgfldr_composed,
                imglstOrigin: [],
                imglstCopy: [],
                imglstComposed: [],
                imgProcessTimer: null,
                PRINTHOST: 'http://127.0.0.1:7010',
                bStopPrintint: false,
            }
        },
        computed: {
            curShowImg() {
                return this.imglstOrigin.length>0? this.imglstOrigin[0]:"";
            },
            val_fltr_blight() {
                return (this.$store.state.ProNew.step2.val_fltr_blight - 50) / 50;
            },
            val_fltr_contrast() {
                return (this.$store.state.ProNew.step2.val_fltr_contrast - 50) / 50;
            },
        },
        methods: {
            creOriginImgsTimer() {
                if(!this.imgProcessTimer){
                    if(this.imgfldrOrigin || this.imgfldrCopy){
                        this.imgProcessTimer = window.setInterval(this.getImgsLists, 5000);
                        // 立刻执行一次
                        this.getImgsLists();
                        console.log('timer created!')
                    }
                }
            },
            getImgsInFolder(folder, target){
                if(folder){
                    let stat = fs.statSync(folder);
                    if(stat && stat.isDirectory()){
                        fs.readdir(folder, (err, files) => {
                            let imglst = [];
                            files.forEach((file) => {
                                let fpath = path.join(folder, file)
                                let obj = fs.statSync(fpath)
                                if(obj && obj.isFile()){
                                    imglst.push({
                                        'fullPath': fpath,
                                        'bUsed': false,
                                        'fileName': file
                                    });
                                }
                            })
                            if(target == 'origin'){
                                this.imglstOrigin = imglst;
                            }else if (target == 'copy') {
                                this.imglstCopy = imglst
                            }
                        })
                    }
                }
            },
            // 获取图片列表: 原始图片（待处理），处理后图片（待打印）
            getImgsLists() {
                this.getImgsInFolder(this.imgfldrOrigin, 'origin');
                this.getImgsInFolder(this.imgfldrCopy, 'copy');
            },
            // 美化照片
            beautyPicturs() {
                let _this = this;
                let idx = 0;
                this.imglstOrigin.forEach(elem => {
                    let img = new Image();
                    img.src = elem;
                    img.onload = function(){
                        var canvas = fx.canvas();
                        var texture = canvas.texture(this);
                        canvas.draw(texture).brightnessContrast(_this.val_fltr_blight, _this.val_fltr_contrast).update();
                        let base64Str = canvas.toDataURL('image/png')
                        // file full path
                        let imgName = (++idx).toString() + '.png';
                        let filepath = path.join(_this.imgfldrCopy, imgName);
                        ipcRenderer.send('ipc-savebase64', {data:base64Str, filepath});
                        ipcRenderer.on('ipc-savebase64', (event, arg)=>{
                            // if(arg.status === 0){
                            //     _this.$http.get(_this.PRINTHOST + '/printImg?imgUrl=' + arg.filepath)
                            //         .then((res) => {
                            //             console.log('打印成功');
                            //         })
                            //         .catch((err) => {
                            //             console.error(err);
                            //         })
                            // }
                        })
                    }
                });
            },
            download() {
                // console.log('test dowlonad')
                // this.beautyPicturs()
                this.$http.post(this.PRINTHOST+'/enhanceImg', {
                    "originAddr":"D:\\Node\\Imgs\\origin\\2012级2班.jpg",
                    "targetAddr":"D:\\Node\\Imgs\\copy",
                    "brightness":0.5,
                    "contrast":10,
                    "saveStartNo":"0000"
                })
                .then((res)=>{
                    console.log(res)
                })
                .catch((err)=>{
                    console.error(err);
                })
            }
        },
        // 开始打印，逐条处理
        begainPrinting() {
            if(this.imglstOrigin.length > 0){
                console.log('begin printing');
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.creOriginImgsTimer();
            })
        },
        beforeRouteLeave (to, from, next) {
            window.clearInterval(this.imgProcessTimer);
            this.imgProcessTimer = null
            next();
            console.log('time cleared!')
        },
    }
</script>

<style lang="" scoped>
.step6 {
    padding: 10px 0px;
    height: 430px;
}
.step6-main {
    width: 100%;
    height: 400px;
    display: inline-block;
}
.main-before-process-list{
    width: 60%;
    height: 100%;
    border: 1px solid #677084;
    padding: 5px 5px;
    overflow-y: scroll;
    float: left;
}
.main-printing-list{
    margin-left: 3px;
    width: 20%;
    height: 100%;
    border: 1px solid #677084;
    float: left;
}
.printing-list-elem{
    padding-left: 1px;
    padding-right: 1px;
    padding-top: 2px;
    padding-bottom: 2px;
}
.printing-list-elem:hover{
    cursor: pointer;
}
.unprinted{
    background-color: #a9bce6;
}
.printed{
    background-color: rgba(3, 197, 25, 0.63);
}
.befor-process-img-small{

}
.befor-process-img-small > img{
    width: 100%;
    height: 100%;
    padding-top: 3px;
    padding-left: 3px;
    display: inline-block;
}

</style>
