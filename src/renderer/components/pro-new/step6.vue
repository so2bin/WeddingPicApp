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
                imgOriginTimer: null,
                PRINTHOST: 'http://127.0.0.1:7010',
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
                if(!this.imgOriginTimer){
                    if(this.imgfldrOrigin){
                        fs.stat(this.imgfldrOrigin, (err, stats) => {
                            if(err){
                                console.error(err);
                                return;
                            }
                            if(stats.isDirectory()){
                                this.imgOriginTimer = window.setInterval(this.getOriginImgsList, 5000);
                                // 立刻执行一次
                                this.getOriginImgsList();
                                console.log('timer created!')
                            }
                        })
                    }else{

                    }
                }
            },
            // 获取原始图片列表
            getOriginImgsList() {
                fs.readdir(this.imgfldrOrigin, (err, files) => {
                    let imglst = [];
                    files.forEach((file) => {
                        imglst.push(path.join(this.imgfldrOrigin, file));
                    })
                    this.imglstOrigin = imglst;
                })
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
                            if(arg.status === 0){
                                _this.$http.get(_this.PRINTHOST + '/printImg?imgUrl=' + arg.filepath)
                                    .then((res) => {
                                        console.log('打印成功');
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    })
                            }
                        })
                    }
                });
            },
            download() {
                console.log('test dowlonad')
                this.beautyPicturs()
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.creOriginImgsTimer();
            })
        },
        beforeRouteLeave (to, from, next) {
            window.clearInterval(this.imgOriginTimer);
            this.imgOriginTimer = null
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
.main-before-process-list{
    width: 70%;
    height: 400px;
    border: 1px solid #677084;
    padding: 5px 5px;
    overflow-y: scroll;
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
