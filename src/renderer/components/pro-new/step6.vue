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
                v-for="(item, idx) in imgPrePrintQueue">
                    {{ item.fileName }}
                </div>
                <div style="height:5px; width:100%; background-color:#666;"></div>
                <div class="printing-list-elem"
                :class="{printed: item.bUsed}"
                v-for="(item, idx) in imgPrintedQueue">
                    {{ item.fileName }}
                </div>
            </div>
        </div>
        <input type="button" name="" value="打印" @click="printing">
        <input type="button" name="" value="暂停" @click="stop">
    </div>
</template>

<script lang="">
let fs = require('fs')
let path = require('path')
import { ipcRenderer } from 'electron'
import fx from 'glfx'
let mkdirp = require('mkdirp')

    //判断当前字符串是否以str结束
    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (str){
            return this.slice(-str.length) == str;
        };
    };

    export default {
        data() {
            return {
                imgfldrOrigin: this.$store.state.ProNew.step4.imgfldr_origin,
                imgfldrCopy: this.$store.state.ProNew.step4.imgfldr_copy,
                imgfldrComposed: this.$store.state.ProNew.step4.imgfldr_composed,
                imglstOrigin: [],  // time orderd queue, FIFO
                imglstCopy: [],
                imglstComposed: [],
                imgPrePrintQueue: [], // 待打印队列
                imgPrintedQueue: [],  // 已打印队列
                preImgMap: new Map(), // 待打印队列对应Map
                historyImgMap: new Map(),  // 已打印队列对应Map
                imgProcessTimer: null,
                imgPrintingTimer: null,
                PRINTHOST: 'http://127.0.0.1:7010',
                bStopWork: false,
                // 标记是否连续美化照片函数正在运行（打印、上传过程都可能会触发改函数，而只需要一个地方调用即可）
                bInBeautyStatus: false,
                curBtyImgNo: '0000',  // 起始图片编号
            }
        },
        computed: {
            curShowImg() {
                return this.imglstOrigin.length>0? this.imglstOrigin[0].fullPath:"";
            },
            val_fltr_blight() {
                return (this.$store.state.ProNew.step2.val_fltr_blight - 50) / 50;
            },
            val_fltr_contrast() {
                return (this.$store.state.ProNew.step2.val_fltr_contrast - 50) / 50;
            },
            printhistory(){
                return this.imgfldrCopy + '/printhistory.txt';
            },
            uploadhistory(){
                return this.imgfldrCopy + '/upload.txt';
            }
        },
        methods: {
            // 在copy目录中生成两文件，分别保存当前目录里面的照片的
            // 打印历史（printhistory.txt）与上传历史（upload.txt）
            auto_cre_file(){
                if(!fs.existsSync(this.imgfldrCopy)){
                    mkdirp.sync(this.imgfldrCopy)
                }
                if(!fs.existsSync(this.imgfldrComposed)){
                    mkdirp.sync(this.imgfldrComposed)
                }
                if(!fs.existsSync(this.printhistory)){
                    fs.writeFile(this.printhistory, "");
                }
                if(!fs.existsSync(this.uploadhistory)){
                    fs.writeFile(this.uploadhistory, "");
                }
            },
            // 往历史文件中记录数据
            logHistory(type, data, succ){
                if(data){
                    if(type == 'print'){
                        let str = data.fullPath + ' ' + data.fileName + ' ' + (succ? 1:0);
                        fs.writeFile(this.printhistory, str, {'flags': 'a'}, (err)=>{
                            if(err){
                                console.error('log print history error: ', err)
                            }
                        });
                    }else if (type == 'upload') {
                        let str = data.fullPath + ' ' + data.fileName + ' ' + (succ? 1:0);
                        fs.writeFile(this.uploadhistory, str, {'flags': 'a'}, (err)=>{
                            if(err){
                                console.error('log upload history error: ', err)
                            }
                        });
                    }
                }
            },
            creOriginImgsTimer() {
                if(!this.imgProcessTimer){
                    if(this.imgfldrOrigin || this.imgfldrCopy){
                        this.imgProcessTimer = window.setInterval(this.getImgsLists, 3000);
                        // 立刻执行一次
                        this.getImgsLists();
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
                                if(obj && obj.isFile() && !fpath.endsWith('.txt')){
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
            // 维护历史队列
            updateQueue(preMap, historyMap, preQueue, newQueue){
                for(let img of newQueue){
                    if(!preMap.has(img.fileName) && !historyMap.has(img.fileName)){
                        preMap.set(img.fileName, img);
                        preQueue.push(img);
                    }
                };
            },
            // 获取图片列表: 原始图片（待处理），处理后图片（待打印）
            getImgsLists() {
                this.getImgsInFolder(this.imgfldrOrigin, 'origin');
                this.getImgsInFolder(this.imgfldrCopy, 'copy');
                // 待打印与待上传队列的维护
                this.updateQueue(this.preImgMap, this.historyImgMap, this.imgPrePrintQueue, this.imglstCopy);
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
            printing() {
                this.begainPrinting()
            },
            stop(){
                this.bStopWork = true;
                this.stopPrintingTimer();
            },
            // 处理一张照片，从队列中找出第一张，FIFO
            callBeauty(){
                if(this.imglstOrigin.length > 0){
                    let curBtyImg = this.imglstOrigin[0];
                    if(curBtyImg){
                        return this.$http.post(this.PRINTHOST+'/enhanceImg', {
                            "originAddr": curBtyImg.fullPath,
                            "targetAddr": this.imgfldrCopy,
                            "moveToAddr": this.imgfldrComposed,
                            "brightness":0.5,
                            "contrast":10,
                            "saveStartNo":this.curBtyImgNo
                        })
                    }
                }
                return false;
            },
            // beauty once
            beautyImgOnce: async function() {
                this.bInBeautyStatus = true;
                try{
                    let res = await this.callBeauty();
                    if(!res){
                        return false;
                    }
                    if(res.status !== 200 || res.data.status != 0){
                        throw new Error(res.data.msg)
                    }else{
                        this.imglstOrigin.shift();
                        this.curBtyImgNo = res.data.imgNo[res.data.imgNo.length-1]
                    }
                }catch(err){
                    console.error(err);  // 改为弹框提示
                    // 需要做一些标记处理
                    return false;
                }
                this.bInBeautyStatus = false;
                return true;
            },
            // 打印一张照片，从队列中找出第一张，FIFO
            callPrint(){
                if(this.imgPrePrintQueue.length > 0){
                    let curPrintImg = this.imgPrePrintQueue[0];
                    if(curPrintImg){
                        let params = {
                            imgUrl: curPrintImg.fullPath,
                            template: {
                                lng: this.$store.state.ProNew.step1.lng,
                                hr: this.$store.state.ProNew.step1.hr
                            }
                        }
                        return this.$http.post(this.PRINTHOST+'/printImg', params);
                    }
                }
                return false;
            },
            printImgOnce: async function(){
                try{
                    let res = await this.callPrint();
                    if(!res){
                        return false;
                    }
                    if(res.status !== 200 || res.data.status != 0){
                        throw new Error(res.data.msg)
                    }else{
                        let printedImg = this.imgPrePrintQueue.shift();
                        this.logHistory('print', printedImg, true);
                        printedImg.bUsed = true;
                        this.imgPrintedQueue.push(printedImg);
                        this.preImgMap.set(printedImg.fileName, printedImg)
                    }
                }catch(err){
                    console.error(err);
                    // 需要做一些标记处理
                    return false;
                }
                return true;
            },
            // 连续处理照片，直到被通知暂停
            continueBeautyImgs: async function(){
                if(!this.bInBeautyStatus){
                    while(this.imglstOrigin.length > 0 && !this.bStopWork){
                        this.beautyImgOnce();
                    }
                    this.bInBeautyStatus = false;
                }
            },
            // 连续打印已美化照片，直到被通知暂停
            continuePrintImgs: async function(){
                while(this.imgPrePrintQueue.length > 0 && !this.bStopWork){
                    this.printImgOnce();
                }
            },
            // 每次只美化一张并打印一张
            beautyAndPrintOnce: async function(){
                let bs = await this.beautyImgOnce();
                let ps = await this.printImgOnce();
            },
            startPrintingTimer(){
                if(!this.imgPrintingTimer){
                    this.imgPrintingTimer = window.setInterval(this.beautyAndPrintOnce, 3000);
                    // 立刻执行一次
                    this.beautyAndPrintOnce();
                    console.log('printing timer created!')
                }
            },
            stopPrintingTimer(){
                window.clearInterval(this.imgPrintingTimer);
                this.imgPrintingTimer = null;
                console.log('stop printing timer');
            },
            // 开始打印，逐条处理，每次只取队列第一条数据， FIFO
            begainPrinting() {
                this.startPrintingTimer();
            },
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.creOriginImgsTimer();
                vm.auto_cre_file();
            })
        },
        beforeRouteLeave (to, from, next) {
            window.clearInterval(this.imgProcessTimer);
            this.imgProcessTimer = null;
            this.bStopWork = true
            next();
            console.log('time cleared!')
        },
    }
</script>

<style lang="" scoped>
.step6 {
    padding: 10px 0px;
    height: 450px;
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
