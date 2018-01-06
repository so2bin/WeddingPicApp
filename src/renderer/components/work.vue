<template lang="">
    <div class="work">
        <div class="work-main">
            <div class="main-before-process-list">
                <!-- D:\照片\通信研究生毕业合照（大合照+各班合照） -->
                <!-- <span class="befor-process-img-small">
                    <img :src="item" alt="" v-for="(item, idx) in imglstOrigin">
                </span> -->
                <div class="befor-process-img-small">
                    <img :src="curShowImg" alt="">
                    <div class="process-img-setting">
                        <div style="float:left; margin-left:10px;">编号：{{ curPImgName }}</div>
                        <div class="">
                            <span>打印张数</span>
                            <input type="number" name="张数" value="" v-model.number="curPrntNum">
                        </div>
                        <div class="" style="float:right; margin-right:15px;">
                            <span>总打印数：</span> {{ totalPrintedNum }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-printing-list">
                <div class="pre-printing-list">
                    <div class="printing-list-elem"
                    :class="{printed: item.bUsed}"
                    v-for="(item, idx) in imgPrePrintQueue">
                        {{ item.fileName }}
                    </div>
                </div>
                <div style="height:5px; width:100%; background-color:#abb6d0;"></div>
                <div class="printed-list">
                    <div class="printing-list-elem print-history-elem"
                    :class="{printed: true, actived: selHistorySet[idx]}"
                    v-for="(item, idx) in imgPrintedQueue"
                    :value="idx"
                    @click="selHistory">
                        {{ item.fileName }}
                    </div>
                </div>
                <div class="print-oper" v-show="bSelPrintElem">
                    <div class="reprint-elem" v-on:mouseenter="showReprint" v-on:mouseleave="displayReprint"
                        @click="doReprint">
                        <label for="">
                          <img src="/static/img/icons/reset.svg" alt="">
                        </label>
                        <span class="reprint-tips" v-show="bShowReprint">
                            重打
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <input type="button" name="" value="打印" @click="printing">
        <input type="button" name="" value="暂停" @click="stop">
        <input type="button" name="" value="上传" @click="upload">
    </div>
</template>

<script lang="">
let fs = require('fs')
let path = require('path')
import { ipcRenderer } from 'electron'
import fx from 'glfx'
let mkdirp = require('mkdirp')
import {dbs} from '../../tools/ndb'
import {UUFile} from '../../tools/uufile'
const COS = require('../../tools/cos');

    //判断当前字符串是否以str结束
    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (str){
            return this.slice(-str.length) == str;
        };
    };

    export default {
        data() {
            return {
                proName: this.$store.state.ProNew.step1.proName,
                imgfldrOrigin: this.$store.state.ProNew.step4.imgfldr_origin,
                imgfldrCopy: this.$store.state.ProNew.step4.imgfldr_copy,
                imgfldrBeauty: this.$store.state.ProNew.step4.imgfldr_beauty,
                imglstOrigin: [],  // time orderd queue, FIFO
                imglstCopy: [],
                imglstBeauty: [],
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
                // 打印
                prntNum: 1,
                bSelPrintElem: false,   // 是否显示重打按钮组
                selHistorySet: {count: 0},   // 用于保存选择的历史记录并控制颜色， count统计选择个数
                bShowReprint: false,
                totalPrintedNum: 0,
                // curPImgName: ""
            }
        },
        computed: {
            cdb (){
                return dbs.getdb(this.$store.state.ProNew.step1.proName);
            },
            user: {
                get(){
                    return this.$store.state.user;
                }
            },
            curPrntNum: {
                get (){
                    return this.prntNum
                },
                set(val){
                    if(val <=0 ){
                        this.prntNum = 1
                    }else if(val > 10){
                        this.prntNum = 10
                    }else{
                        this.prntNum = val
                    }
                }
            },
            curShowImg() {
                return this.imgPrePrintQueue.length>0? this.imgPrePrintQueue[0].fullPath:"";
            },
            curPImgName(){
                if(this.curShowImg){
                    return path.basename(this.curShowImg)
                }else{
                    return ""
                }
            },
            val_fltr_blight() {
                return (this.$store.state.ProNew.step2.val_fltr_blight - 50) / 50;
            },
            val_fltr_contrast() {
                return (this.$store.state.ProNew.step2.val_fltr_contrast - 50) / 50;
            },
            bReverse(){
                return this.$store.state.ProNew.step1.bReverse !== '0';  // '0'为默认模板在下
            }
        },
        methods: {
            imgMap2Array(imgMap){
                let arr = []
                for(let itm of imgMap){
                    if(itm[0]){
                        arr.push(itm[1])
                    }
                }
                return arr;
            },
            selHistory(e){
                e.preventDefault();
                let idx = e.target.getAttribute('value');
                if(this.selHistorySet[idx]){
                    this.$set(this.selHistorySet, idx, false);
                    --this.selHistorySet.count;
                }else{
                    this.$set(this.selHistorySet, idx, true);
                    ++this.selHistorySet.count;
                }
                if(this.selHistorySet.count > 0){
                    this.bSelPrintElem = true;
                }else{
                    this.bSelPrintElem = false;
                }
            },
            showReprint(e){
                this.bShowReprint = true;
            },
            // 重新打印选择的历史照片
            doReprint(e){
                for(let idx in this.selHistorySet){
                    if(idx == 'count'){
                        continue;
                    }
                    if(!this.selHistorySet[idx]){
                        continue;
                    }
                    let img = this.imgPrintedQueue[idx];
                    this.historyImgMap.delete(img.fileName);
                    this.imgPrePrintQueue.push(img);
                    this.preImgMap.set(img.fileName, img);
                    this.selHistorySet[idx] = false;
                }
                this.imgPrintedQueue = this.imgMap2Array(this.historyImgMap);
            },
            displayReprint(e){
                this.bShowReprint = false;
            },
            // 检查目录
            auto_cre_file(){
                if(!fs.existsSync(this.imgfldrOrigin)){
                    mkdirp.sync(this.imgfldrOrigin)
                }
                if(!fs.existsSync(this.imgfldrCopy)){
                    mkdirp.sync(this.imgfldrCopy)
                }
                if(!fs.existsSync(this.imgfldrBeauty)){
                    mkdirp.sync(this.imgfldrBeauty)
                }
            },
            creOriginImgsTimer() {
                if(!this.imgProcessTimer){
                    if(this.imgfldrOrigin || this.imgfldrBeauty){
                        this.imgProcessTimer = window.setInterval(this.getImgsLists, 3000);
                        // 立刻执行一次
                        // this.getImgsLists();
                    }
                }
            },
            // promise化
            getImgsInFolder(folder, target){
                if(folder){
                    let stat = fs.statSync(folder);
                    if(stat && stat.isDirectory()){
                        return new Promise((resolve, reject)=>{
                            fs.readdir(folder, (err, files) => {
                                if(err){
                                    reject(err);
                                }
                                let imglst = [];
                                files.forEach((file) => {
                                    let fpath = path.join(folder, file)
                                    let obj = fs.statSync(fpath)
                                    if(obj && obj.isFile() && !fpath.endsWith('.txt')){
                                        imglst.push({
                                            'fullPath': fpath,
                                            'fileName': file
                                        });
                                    }
                                })
                                if(target == 'origin'){
                                    this.imglstOrigin = imglst;
                                }else if (target == 'beauty') {
                                    this.imglstBeauty = imglst
                                }
                                resolve();
                            })
                        })
                    }
                }
            },
            // 根据队列同步 对应的map
            initImgMap(queue, imgMap){
                imgMap.clear();
                for(let img of queue){
                    imgMap.set(img.fileName, img);
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
            getImgsLists: async function() {
                await this.getImgsInFolder(this.imgfldrOrigin, 'origin');
                await this.getImgsInFolder(this.imgfldrBeauty, 'beauty');
                // 待打印与待上传队列的维护
                this.updateQueue(this.preImgMap, this.historyImgMap, this.imgPrePrintQueue, this.imglstBeauty);
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
                            "targetAddr": this.imgfldrBeauty,
                            "moveToAddr": this.imgfldrCopy,
                            "brightness":0.5,
                            "contrast":10,
                            "saveStartNo":this.curBtyImgNo
                        })
                    }
                }
                return false;
            },
            // beauty once
            beautyImgOnce: async function(doc) {
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
                        this.curBtyImgNo = res.data.imgNo[res.data.imgNo.length-1];
                        this.setDB(doc, {No: this.curBtyImgNo})
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
            callPrint(curPrintImg){
                if(curPrintImg){
                    let params = {
                        imgUrl: curPrintImg.fullPath,
                        template: {
                            lng: this.$store.state.ProNew.step1.lng,
                            hr: this.$store.state.ProNew.step1.hr
                        },
                        bReverse: this.bReverse
                    }
                    return this.$http.post(this.PRINTHOST+'/printImg', params);
                }else{
                    return false;
                }
            },
            printImgOnce: async function(doc, curPrintImg){
                try{
                    let res = await this.callPrint(curPrintImg);
                    if(!res){
                        return false;
                    }
                    if(res.status !== 200 || res.data.status != 0){
                        throw new Error(res.data.msg)
                    }else{
                        let printedImg = this.imgPrePrintQueue.shift();
                        this.preImgMap.delete(printedImg.fileName);
                        this.imgPrintedQueue.push(printedImg);
                        this.historyImgMap.set(printedImg.fileName, printedImg);
                        this.pushDBQueue(doc, {
                            fullPath: printedImg.fullPath,
                            fileName: printedImg.fileName,
                            logtime: new Date()
                        })
                        this.totalPrintedNum += 1;
                    }
                }catch(err){
                    console.error(err);
                    // 需要做一些标记处理
                    return false;
                }
                return true;
            },
            // 根据打印次数，每张照片打印多次
            printImgNTimes: async function(doc, num) {
                if(this.imgPrePrintQueue.length > 0){
                    let curPrintImg = this.imgPrePrintQueue[0];
                    if(typeof curPrintImg !== 'object'){
                        this.imgPrePrintQueue.shift();
                        return false;
                    }
                    let arrPromise = [];
                    for(let i = 0; i < num; ++i){
                        arrPromise.push(this.callPrint(curPrintImg))
                    }
                    await Promise.all(arrPromise)
                    .then((res)=>{
                        let printedImg = this.imgPrePrintQueue.shift();
                        this.preImgMap.delete(printedImg.fileName);
                        this.imgPrintedQueue.push(printedImg);
                        this.historyImgMap.set(printedImg.fileName, printedImg);
                        this.pushDBQueue(doc, {
                            fullPath: printedImg.fullPath,
                            fileName: printedImg.fileName,
                            logtime: new Date()
                        })
                        this.totalPrintedNum += num;
                    })
                    .catch((err)=>{
                        console.error(err);
                    })
                    return true;
                }
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
                let doc = await this.getDBDoc();
                let bs = await this.beautyImgOnce(doc);
                let ps = await this.printImgNTimes(doc, this.prntNum);
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
            //  本地数据库中获取打印历史记录
            getDBDoc: async function(){
                return new Promise((resolve, reject)=>{
                    this.cdb.findOne({name: this.proName}, (err, doc)=>{
                        if(err){
                            console.error(err);
                            reject(null);
                        }else{
                            resolve(doc);
                        }
                    })
                })
            },
            // 初始化DOC
            initDoc(){
                return new Promise((resolve, reject)=>{
                    this.cdb.insert({
                        name: this.proName,
                        historyQueue: [],
                        No: this.curBtyImgNo,
                    }, (err, doc)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(doc);
                        }
                    })
                })
            },
            // update 本地数据库中的历史打印记录
            setDB(doc, setObj){
                return new Promise((resolve, reject)=>{
                    this.cdb.update({name: doc.name}, {$set: setObj},
                        { returnUpdatedDocs: true }, (err, numAffected)=>{
                        if(err){
                            console.error(err);
                            resolve(0);
                        }else{
                            resolve(numAffected);
                        }
                    })
                })
            },
            pushDBQueue(doc, obj){
                return new Promise((resolve, reject)=>{
                    this.cdb.update({name: doc.name}, {$push: {historyQueue: obj}},
                        {}, (err, numAffected)=>{
                            if(err){
                                console.error(err);
                                resolve(0);
                            }else{
                                resolve(numAffected);
                            }
                        })
                })
            },
            // 进入组件时，根据本地数据库，初始化打印历史记录, 同时删除不存在文件夹中的图片的历史记录
            initPrintedQueue: async function(){
                let doc = await this.getDBDoc();
                if(!doc){
                    doc = await this.initDoc();
                }
                await this.initNextNo();
                // 获取当前beauty文件夹中的图片列表，并全部放到preprintMap中
                await this.getImgsInFolder(this.imgfldrBeauty, 'beauty');
                this.initImgMap(this.imglstBeauty, this.preImgMap);
                // 根据历史记录数据，获取待打印列表与已打印列表，同时删除DB历史记录中已经不存在的文件
                let newQueue = []
                for(let itm of doc.historyQueue){
                    let obj = this.preImgMap.get(itm.fileName);
                    // 已打印
                    if(obj){
                        this.historyImgMap.set(obj.fileName, obj);
                        this.preImgMap.delete(obj.fileName);
                        newQueue.push(obj);
                    }else{  // 否则就是历史记录中的文件已经删除

                    }
                }
                this.imgPrePrintQueue = this.imgMap2Array(this.preImgMap);
                this.imgPrintedQueue = this.imgMap2Array(this.historyImgMap);
                doc.historyQueue = newQueue;
                await this.setDB(doc, {historyQueue: doc.historyQueue});
            },
            // 根据本地数据库获取当前的起始图片编号
            initNextNo: async function(){
                let doc = await this.getDBDoc();
                if(!doc){
                    return;
                }else{
                    this.curBtyImgNo = doc.No;
                }
            },
            // 开始上传
            upload(){
                this.testCOS();
            },
            testCOS(){
                let fp = 'D:\\Node\\Imgs\\0001.jpg';
                // COS.deleteObject('MTAw&MTA=&151517029450200013483', (err, data)=>{
                //     console.log('delete: ', err, data);
                // })
                ipcRenderer.send('ipc-upload-img', {
                    userId: this.user.id,
                    suiteId: this.$route.params.suiteId,
                    imgUrl: fp,
                    code: '0001',
                })
                ipcRenderer.on('ipc-upload-img', (event, arg)=>{
                    console.log('ret from ipc: ', arg); // {url, key}
                })
            },
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.auto_cre_file();
                vm.initPrintedQueue();
                vm.creOriginImgsTimer();
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
.work {
    padding: 0px 0px;
    min-height: 540px;
    height: 100%;
}
.work-main {
    width: 100%;
    height: 100%;
    min-height: 540px;
    display: inline-block;
}
.main-before-process-list{
    width: 60%;
    height: 400px;
    min-height: 360px;
    min-width: 500px;
    border: 1px solid #677084;
    padding: 0px 0px;
    /* overflow-y: scroll; */
    float: left;
    position: relative;
}
.befor-process-img-small{
    min-height: 360px;
    min-width: 500px;
    height: 360px;
}
.befor-process-img-small > img{
    width: 100%;
    height: 100%;
    padding-top: 0px;
    padding-left:0px;
    display: inline;
}
.process-img-setting > div {
    display: inline-block;
    line-height: 40px;
    font-size: 15px;
    padding-left: 10px;
}
.process-img-setting input[name='张数'] {
    line-height: 30px;
    height: 30px;
    width: 40px;
    text-align: center;
}
.main-printing-list{
    margin-left: 3px;
    width: 20%;
    height: 400px;
    border: 1px solid #677084;
    float: left;
    position: relative;
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
.actived{
    background-color: #c5b603;
}
.pre-printing-list{
    height: 50%;
}
.printed-list{
    height: 50%;
}
.print-oper{
    position: absolute;
    bottom: -40px;
    width: 100%;
    height: 40px;
}
.reprint-elem{
    height: 40px;
    line-height: 40px;
    position: absolute;
}
.reprint-elem:hover{
    border-radius: 3px;
    -webkit-box-shadow: 0 0 6px rgba(0,113,241,1);
}
.reprint-elem:active{
    border-radius: 3px;
    -webkit-box-shadow: 0 0 6px rgba(0,0,241,1);
}
.reprint-elem > label > img{
    width: 32px;
    height: 32px;
}
.reprint-tips{
    font-size: 13px;
    line-height: 13px;
    position: absolute;
    left: 3px;
    bottom: -16px;
    font-weight: 550;
}
</style>
