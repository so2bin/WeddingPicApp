<template lang="">
<div class="step1">
    <el-container class="step1-container">
        <div class="step1-main-show" v-show="tabActive('long')">
            <div id="step1-main-lng" class="step1-main"
                v-on:mousedown="cmosDownL" v-on:mousemove="cmosMoveL" v-on:mouseup="cmosUpL">
                <canvas id="canvas-lng-tmp" class="canvas" :width="tmpLW" :height="tmpLH"
                    :style="styleCanvasSizeL" style="z-index: 0;"></canvas>
                <canvas id="canvas-lng" class="canvas" :width="tmpLW" :height="tmpLH"
                    :style="styleCanvasSizeL" style="z-index: 1;background:rgba(255,255,255,0)" ></canvas>
            </div>
            <div class="data-tips">
                <span class="tips-item">起点：({{ slx }}, {{ sly }})</span>
                <span class="tips-item">宽：{{ selLW }}</span>
                <span class="tips-item">高：{{ selLH }}</span>
            </div>
        </div>
        <div class="step1-main-show" v-show="tabActive('horizon')">
            <div id="step1-main-hr" class="step1-main"
                v-on:mousedown="cmosDownH" v-on:mousemove="cmosMoveH" v-on:mouseup="cmosUpH">
                <canvas id="canvas-hr-tmp" class="canvas" :width="tmpHW" :height="tmpHH"
                    :style="styleCanvasSizeH"  style="z-index: 0;"></canvas>
                <canvas id="canvas-hr" class="canvas" :width="tmpHW" :height="tmpHH"
                    :style="styleCanvasSizeH"  style="z-index: 1;background:rgba(255,255,255,0)"></canvas>
            </div>
            <div class="data-tips">
                <span class="tips-item">起点：({{ shx }}, {{ shy }})</span>
                <span class="tips-item">宽：{{ selHW }}</span>
                <span class="tips-item">高：{{ selHH }}</span>
            </div>
        </div>
        <el-aside class="step1-aside" width="37%">
            <div class="step1-row">
                <span class="aside-tips">项目名称：</span>
                <el-input v-model="pro_name" placeholder="请输入内容" size="small" style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step1-row">
                <span class="aside-tips">项目尺寸：</span>
                <el-select v-model="selTmp" placeholder="请选择" size="small" @change="tmpChanged"
                    style="width:120px; height:40px; line-height:40px;">
                    <el-option v-for="(tmp, index) in tmpLst" :label="tmp.name" :value="index"></el-option>
                </el-select>
            </div>
            <div class="step1-row">
                <span class="aside-tips">照片比例：</span>
                <el-select v-model="selImgRate" placeholder="请选择" size="small" @change="imgRateChanged"
                    style="width:120px; height:40px; line-height:40px;">
                    <el-option v-for="(tmp, index) in imgRateLst" :label="tmp.name" :value="index"></el-option>
                </el-select>
            </div>
            <div class="tmp-hv">
                <div class="tmp-tab">
                    <!-- 切换显示纵向/横向模板  -->
                    <div class="tab-head" @click="selectTab">
                        <span id="tab-head-itm-long" class="tab-head-itm" :class="{'tab-active': bShowLong}">纵向</span>
                        <span id="tab-head-itm-horizon"  class="tab-head-itm" :class="{'tab-active': !bShowLong}">横向</span>
                    </div>
                    <!--  纵向模板设置  -->
                    <div class="tab-show" v-show="tabActive('long')">
                        <div class="">
                            <span>选择模板：</span>
                            <el-select id="tmp-lng" v-model="selHrTmpIdx" placeholder="请选择" size="small" @change="selecDefTmpL"
                                style="width:120px; height:40px; line-height:40px;">
                                <el-option v-for="(tmp, index) in defTmps.hr" :label="tmp.name" :value="index"></el-option>
                            </el-select>
                        </div>
                        <!--  自定义选择模板文件  -->
                        <div class="tmp-selector" v-show="selHrTmpIdx==2">
                            <input type="file" id="selfLngTmp" style="display:none"
                             @change="selectSelfTmp">
                            <input type="text" name=""  :value="confTmpLngUrl">
                            <label for="selfLngTmp">
                              <img src="/static/img/icons/folder.svg" alt="">
                            </label>
                        </div>
                    </div>
                    <!--  横向模板设置  -->
                    <div class="tab-show" v-show="tabActive('horizon')">
                        <div class="">
                            <span>选择模板：</span>
                            <el-select id="tmp-hr" v-model="selLngTmpIdx" placeholder="请选择" size="small" @change="selecDefTmpH"
                                style="width:120px; height:40px; line-height:40px;">
                                <el-option v-for="(tmp, index) in defTmps.lng" :label="tmp.name" :value="index"></el-option>
                            </el-select>
                        </div>
                        <!--  自定义选择模板文件  -->
                        <div class="tmp-selector" v-show="selLngTmpIdx==2">
                            <input type="file" id="selfHrTmp"  style="display:none"
                             @change="selectSelfTmp">
                            <input type="text" name="" :value="confTmpHrUrl">
                            <label for="selfHzTmp">
                              <img src="/static/img/icons/folder.svg" alt="">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step1-row">
                <template>
                    <el-radio v-model="bInsertQRCode" label="1">使用二维码</el-radio>
                    <el-radio v-model="bInsertQRCode" label="2">不用二维码</el-radio>
                </template>
            </div>
        </el-aside>
        </el-container>
    </div>
</template>

<script lang="">
export default {
    data () {
        return {
            selTmp: 0,
            selImgRate: 0,
            pro_name: '',
            bInsertQRCode: '1',
            bMosDown: false,
            // elx ehx ely ehy 为相对于canvas左上角的坐标
            elx: 0,
            ely: 0,
            ehx: 0,
            ehy: 0,
            canvasL: null,
            _ctxL: null,
            canvasH: null,
            _ctxH: null,
            mainObjL: null,
            mainObjH: null,
            cnvSLX: 0,
            cnvSLY: 0,
            cnvELX: 0,
            cnvELY: 0,
            cnvSHX: 0,
            cnvSHY: 0,
            cnvEHX: 0,
            cnvEHY: 0,
            bShowLong: true,
            selHrTmpIdx: 0,
            selLngTmpIdx: 0
        }
    },
    computed: {
        ctxL(){
            if(!this._ctxL){
                let canvasL = document.getElementById('canvas-lng');
                this._ctxL = canvasL.getContext('2d');
                return this._ctxL;
            }else{
                return this._ctxL
            }
        },
        ctxH(){
            if(!this._ctxH){
                let canvasH = document.getElementById('canvas-hr');
                this._ctxH = canvasH.getContext('2d');
                return this._ctxH;
            }else{
                return this._ctxH
            }
        },
        /***** 纵向模板  ****/
        tmpLW:{
            get() {
                return this.$store.state.ProNew.step1.lng.tmpW
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'tmpW', val})
            }
        },
        tmpLH:{
            get() {
                return this.$store.state.ProNew.step1.lng.tmpH
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'tmpH', val})
            }
        },
        // 左模板照片
        rlw:{
            get() {
                return this.$store.state.ProNew.step1.lng.rw
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'rw', val})
            }
        },
        rlh:{
            get() {
                return this.$store.state.ProNew.step1.lng.rh
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'rh', val})
            }
        },
        // 用户选择区域起点
        // slx shx sly shy 为相对于canvas左上角的坐标
        slx:{
            get() {
                return this.$store.state.ProNew.step1.lng.sx
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'sx', val})
            }
        },
        sly:{
            get() {
                return this.$store.state.ProNew.step1.lng.sy
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'sy', val})
            }
        },
        //  用户选择区域 W H
        selLW:{
            get() {
                return Math.abs(this.slx - this.elx);
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'selW', val})
            }
        },
        selLH:{
            get() {
                return Math.abs(this.sly - this.ely)
            },
            set(val) {
                this.$store.commit('set_step1_lng', {type: 'selH', val})
            }
        },
        /***** 横向模板  ******/
        tmpHW:{
            get() {
                return this.$store.state.ProNew.step1.hr.tmpW
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'tmpW', val})
            }
        },
        tmpHH:{
            get() {
                return this.$store.state.ProNew.step1.hr.tmpH
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'tmpH', val})
            }
        },
        rhw:{
            get() {
                return this.$store.state.ProNew.step1.hr.rw
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'rw', val})
            }
        },
        rhh:{
            get() {
                return this.$store.state.ProNew.step1.hr.rh
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'rh', val})
            }
        },
        shx:{
            get() {
                return this.$store.state.ProNew.step1.hr.sx
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'sx', val})
            }
        },
        shy:{
            get() {
                return this.$store.state.ProNew.step1.hr.sy
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'sy', val})
            }
        },
        selHW:{
            get() {
                return Math.abs(this.shx - this.ehx);
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'selW', val})
            }
        },
        selHH:{
            get() {
                return Math.abs(this.shy - this.ehy)
            },
            set(val) {
                this.$store.commit('set_step1_hr', {type: 'selH', val})
            }
        },
        tmpLst(){
            return this.$store.state.Tmplst.tmpLst.lng;
        },
        imgRateLst(){
            return this.$store.state.Tmplst.imgRate;
        },
        styleCanvasSizeL(){
            return {
                "margin-top": -Math.round(this.tmpLH/2)+"px",
                "margin-left": -Math.round(this.tmpLW/2)+"px",
            }
        },
        styleCanvasSizeH(){
            return {
                "margin-top": -Math.round(this.tmpHH/2)+"px",
                "margin-left": -Math.round(this.tmpHW/2)+"px",
            }
        },
        defTmps(){
            return this.$store.state.Tmplst.defTmps;
        },
        confTmpLngUrl: {
            get() {
                return this.$store.state.ProCnf.tmp.lng.url;
            },
            set(val) {
                this.$store.commit('set_cnf_tmp_url', {type: 'lng', val})
            }
        },
        confTmpHrUrl: {
            get() {
                return this.$store.state.ProCnf.tmp.hr.url;
            },
            set(val) {
                this.$store.commit('set_cnf_tmp_url', {type: 'hr', val})
            }
        },
    },
    methods: {
        clearCanvas(type){
            if(type == 'lng'){
                if(this.ctxL){
                    this.ctxL.clearRect(0, 0, this.ctxL.canvas.width, this.ctxL.canvas.height);
                }
            }else if(type == 'hr'){
                if(this.ctxH){
                    this.ctxH.clearRect(0, 0, this.ctxH.canvas.width, this.ctxH.canvas.height);
                }
            }
        },
        /*****   画图相关  ******/
        getCX(e){
            if(e.target.id == 'canvas-lng' || e.target.id == 'canvas-hr'){
                return e.offsetX;
            }else if(e.target.id == 'step1-main-lng'){
                if(e.offsetX < this.cnvSLX){
                    return 0;
                }else if (e.offsetX > this.cnvELX) {
                    return this.canvasL.width;
                }else{
                    return e.offsetX - this.cnvSLX;
                };
            }else if(e.target.id == 'step1-main-hr'){
                if(e.offsetX < this.cnvSHX){
                    return 0;
                }else if (e.offsetX > this.cnvEHX) {
                    return this.canvasH.width;
                }else{
                    return e.offsetX - this.cnvSHX;
                };
            }
        },
        getCY(e){
            if(e.target.id == 'canvas-lng' || e.target.id == 'canvas-hr'){
                return e.offsetY;
            }else if(e.target.id == 'step1-main-lng'){
                if(e.offsetY < this.cnvSLY){
                    return 0;
                }else if (e.offsetY > this.cnvELY) {
                    return this.canvasL.height;
                }else{
                    return e.offsetY - this.cnvSLY;
                };
            }else if(e.target.id == 'step1-main-hr'){
                if(e.offsetY < this.cnvSHY){
                    return 0;
                }else if (e.offsetY > this.cnvEHY) {
                    return this.canvasH.height;
                }else{
                    return e.offsetY - this.cnvSHY;
                };
            }
        },
        // 当y在边界时需要这个函数来固定x
        getScaleCXWithCY(sclH, e, type){
            if(type == 'lng'){
                let sclW = Math.round(this.rlw * sclH / this.rlh)
                let rx = this.getCX(e);
                if(rx > this.slx){
                    return sclW + this.slx;
                }else{
                    return this.slx - sclW;
                }
            }else{
                let sclW = Math.round(this.rhw * sclH / this.rhh)
                let rx = this.getCX(e);
                if(rx > this.shx){
                    return sclW + this.shx;
                }else{
                    return this.shx - sclW;
                }
            }
        },
        // 位置变化时，以x为优先计算值
        getScaleCYWithCX(e, type){
            if(type == 'lng'){
                let nLW = Math.abs(this.elx - this.slx);
                let sclH = Math.round(this.rlh * nLW / this.rlw);
                let ry = this.getCY(e);  // 当前真实的y
                // y到达边缘，固定x
                if(ry == this.canvasL.height){
                    this.elx = Math.round(this.rlw * Math.abs(this.sly - ry) / this.slh);
                }
                let sclely = 0
                if(ry > this.sly){
                    sclely = sclH + this.sly;
                }else{
                    sclely = this.sly - sclH;
                }

                if(sclely > this.canvasL.height){
                    // 终点y超出下界
                    // 固定x
                    this.elx = this.getScaleCXWithCY(Math.abs(this.canvasL.height - this.sly), e, type)
                    return this.canvasL.height;
                }
                else if(sclely < 0){
                    // 终点y超出上界
                    // 固定x
                    this.elx = this.getScaleCXWithCY(Math.abs(this.sly - 0), e, type)
                    return 0;
                }else {
                    return sclely;
                }
            }else if(type == 'hr'){
                let nLW = Math.abs(this.ehx - this.shx);
                let sclH = Math.round(this.rhh * nLW / this.rhw);
                let ry = this.getCY(e);  // 当前真实的y
                let sclehy = 0
                if(ry > this.shy){
                    sclehy = sclH + this.shy;
                }else{
                    sclehy =  this.shy - sclH;
                }

                if(sclehy > this.canvasH.height){
                    // 终点y超出下界
                    // 固定x
                    this.ehx = this.getScaleCXWithCY(Math.abs(this.canvasH.height - this.shy), e, type)
                    return this.canvasH.height;
                }
                else if(sclehy < 0){
                    // 终点y超出上界
                    // 固定x
                    this.ehx = this.getScaleCXWithCY(Math.abs(this.shy - 0), e, type)
                    return 0;
                }else {
                    return sclehy;
                }
            }

        },
        cmosDownL(e){
            this.bMosDown = true;
            if(!this.mainObjL){
                this.mainObjL = document.getElementById('step1-main-lng');
            }
            if(!this.canvasL){
                this.canvasL = document.getElementById('canvas-lng');
                this.cnvSLX = this.canvasL.offsetLeft;  // - this.mainObjL.offsetLeft
                this.cnvSLY = this.canvasL.offsetTop;  // - this.mainObjL.offsetTop
                this.cnvELX = this.canvasL.width + this.cnvSLX;
                this.cnvELY = this.canvasL.height + this.cnvSLY;
            }
            if(!this.ctxL){
                this.ctxL = this.canvasL.getContext('2d');
                this.ctxL.fillStyle = '#ff0000';
                this.ctxL.strokeStyle = '#f30101'
            }
            this.elx = this.slx = this.getCX(e);
            this.ely = this.sly = this.getCY(e);
            this.clearCanvas('lng');
        },
        cmosMoveL(e){
            if(this.bMosDown){
                this.elx = this.getCX(e);
                this.ely = this.getScaleCYWithCX(e, 'lng');
                this.clearCanvas('lng');
                this.ctxL.setLineDash([6]);
                this.ctxL.strokeRect(this.slx, this.sly, this.elx-this.slx, this.ely-this.sly);
                this.ctxL.fillStyle="rgba(220,158,20,0.81)";
                this.ctxL.fillRect(this.slx, this.sly, this.elx-this.slx, this.ely-this.sly);
            }
        },
        cmosUpL(e){
            this.bMosDown = false;
            this.elx = this.getCX(e);
            this.ely = this.getScaleCYWithCX(e, 'lng');
            this.clearCanvas('lng');
            this.ctxL.setLineDash([6]);
            this.ctxL.strokeRect(this.slx, this.sly, this.elx-this.slx, this.ely-this.sly);
            this.ctxL.fillStyle="rgba(220,158,20,0.81)";
            this.ctxL.fillRect(this.slx, this.sly, this.elx-this.slx, this.ely-this.sly);
        },
        cmosDownH(e){
            this.bMosDown = true;
            if(!this.mainObjH){
                this.mainObjH = document.getElementById('step1-main-hr');
            }
            if(!this.canvasH){
                this.canvasH = document.getElementById('canvas-hr');
                this.cnvSHX = this.canvasH.offsetLeft;  //  - this.mainObjH.offsetLeft
                this.cnvSHY = this.canvasH.offsetTop;  //  - this.mainObjH.offsetTop
                this.cnvEHX = this.canvasH.width + this.cnvSHX;
                this.cnvEHY = this.canvasH.height + this.cnvSHY;
            }
            if(!this.ctxH){
                this.ctxH = this.canvasH.getContext('2d');
                this.ctxH.fillStyle = '#ff0000';
                this.ctxH.strokeStyle = '#f30101'
            }
            this.ehx = this.shx = this.getCX(e);
            this.ehy = this.shy = this.getCY(e);
            this.clearCanvas('hr');
        },
        cmosMoveH(e){
            if(this.bMosDown){
                this.ehx = this.getCX(e);
                this.ehy = this.getScaleCYWithCX(e, 'hr');
                this.clearCanvas('hr');
                this.ctxH.setLineDash([6]);
                this.ctxH.strokeRect(this.shx, this.shy, this.ehx-this.shx, this.ehy-this.shy);
                this.ctxH.fillStyle="rgba(220,158,20,0.81)";
                this.ctxH.fillRect(this.shx, this.shy, this.ehx-this.shx, this.ehy-this.shy);
            }
        },
        cmosUpH(e){
            this.bMosDown = false;
            this.ehx = this.getCX(e);
            this.ehy = this.getScaleCYWithCX(e, 'hr');
            this.clearCanvas('hr');
            this.ctxH.setLineDash([6]);
            this.ctxH.strokeRect(this.shx, this.shy, this.ehx-this.shx, this.ehy-this.shy);
            this.ctxH.fillStyle="rgba(220,158,20,0.81)";
            this.ctxH.fillRect(this.shx, this.shy, this.ehx-this.shx, this.ehy-this.shy);
        },
        /*****   其它  ******/
        // 选择项目尺寸）
        tmpChanged(idx){
            let curTmp = this.tmpLst[idx];
            this.tmpLW = curTmp.showW;
            this.tmpLH = curTmp.showH;
            this.tmpHW = curTmp.showH;
            this.tmpHH = curTmp.showW;
        },
        // 选择照片比例
        imgRateChanged(idx){
            // 纵向为w小h大，imgRateLst配置默认为横向配置
            let curImgRate = this.imgRateLst[idx];
            // 纵向比例
            this.rlw = curImgRate.rh;
            this.rlh = curImgRate.rw;
            // 横向比例
            this.rhw = curImgRate.rw;
            this.rhh = curImgRate.rh;
        },
        tabActive(t){
            if(t == 'long'){
                return this.bShowLong;
            }else{
                return !this.bShowLong;
            }
        },
        // 切换纵横
        selectTab(e){
            if(e.target.id == 'tab-head-itm-long'){
                this.bShowLong = true;
            }else if(e.target.id == 'tab-head-itm-horizon'){
                this.bShowLong = false;
            }
        },
        // 在指定canvas中展示指定图片url
        showImgInCanv(type){
            if(type == 'lng'){
                let canv =document.getElementById('canvas-lng-tmp');
                let ctx = canv.getContext('2d');
                ctx.clearRect(0, 0, this.tmpLW, this.tmpLH);
                let newImg = new Image();
                newImg.src = this.confTmpLngUrl;
                newImg.width = this.tmpLW;
                newImg.height = this.tmpLH;
                newImg.onload = ()=>{
                    ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height);
                }
            }else if(type == 'hr'){
                let canv =document.getElementById('canvas-hr-tmp');
                let ctx = canv.getContext('2d');
                ctx.clearRect(0, 0, this.tmpHW, this.tmpHH);
                let newImg = new Image();
                newImg.src = this.confTmpHrUrl;
                newImg.width = this.tmpHW;
                newImg.height = this.tmpHH;
                newImg.onload = ()=>{
                    ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height);
                }
            }
        },
        // 选择默认模板   纵向
        selecDefTmpL(idx){
            let tmp = this.defTmps.lng[idx];
            this.confTmpLngUrl = tmp.url;
            this.showImgInCanv('lng');
        },
        // 选择默认模板   横向
        selecDefTmpH(idx){
            let tmp = this.defTmps.hr[idx];
            this.confTmpHrUrl = tmp.url;
            this.showImgInCanv('hr');
        },
        // 选择自定义模板
        selectSelfTmp(){
            let trgtId = event.target.id
            let selPath = event.currentTarget.files[0]
            if (!selPath) {
                return
            }
            if (trgtId == 'selfLngTmp') {
                this.confTmpLngUrl = selPath.path;
                let canv =document.getElementById('canvas-lng');
                let ctx = canv.getContext('2d');
                let newImg = new Image();
                newImg.src = this.confTmpLngUrl;
                newImg.width = this.tmpLW;
                newImg.height = this.tmpLH;
                newImg.onload = ()=>{
                    ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height);
                }
            }else if (trgtId == 'selfHrTmp') {
                this.confTmpHrUrl = selPath.path;
                let canv =document.getElementById('canvas-hr');
                let ctx = canv.getContext('2d');
                let newImg = new Image();
                newImg.src = this.confTmpHrUrl;
                newImg.width = this.tmpHW;
                newImg.height = this.tmpHH;
                newImg.onload = ()=>{
                    ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height);
                }
            }

        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {

        })
    },
}
</script>

<style lang="" scoped>
.step1 {
    padding: 10px 0px;
}

.step1-container {
    height: 450px;
}
.step1-main-show{
    min-width: 520px;
    width: 80%;
}
.step1-main {
    margin-right: 3px;
    border: 1px solid #A5A060;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    text-align: center;
    height: 80%;
    min-height: 400px;
    cursor: crosshair;
    position: relative;
}
.canvas {
    background: #d3dce6;
    /* border: 1px solid; */
    /*margin: 0 auto;*/
    position: absolute;
    left: 50%;
    top: 50%;
}
.data-tips{
    margin-right: 3px;
    height: 50px;
    border: 1px solid #A5A060;
    border-top: 0px;
    text-align: left;
    padding-left: 5px;
}
.tips-item{
    padding-left: 8px;
    line-height: 50px;
}
.step1-aside {
    padding: 10px 0px;
    border: 1px solid #A5A060;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    line-height: 40px;
    min-width: 240px;
    width: 20%;
}

.step1-aside .aside-tips {
    float: left;
    padding-left: 18px;
}

.step1-aside .step1-row {
    width: 100%;
    line-height: 40px;
    height: 40px;
}
.tmp-hv{
    margin-top: 8px;
    width: 100%;
}
.tab-head{
    border-bottom: 1px solid #91a9ec;
}
.tab-head-itm{
    display: inline-block;
    width: 49%;
    /*border-bottom: 1px solid #000;*/
}
.tab-active{
    background: linear-gradient(to top, #91a9ec, #d3dce6);
    border-radius: 3px;
}
.tab-show{
    min-height: 50px;
}
.tmp-selector > label >  img{
  width: 22px;
  height: 18px;
  position: relative;
  top: -1px;
  left:8px;
  cursor: pointer;
  background-color: #f3f3c9;
  border-radius: 3px;
}
.tmp-selector > input[type='text']{
  height: 22px;
  max-width: 300px;
  width: 60%;
  background-color: #f7f7f7;
  border-width: 0px;
}
</style>
