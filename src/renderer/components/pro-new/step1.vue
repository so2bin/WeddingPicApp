<template lang="">
<div class="step1">
    <el-container class="step1-container">
        <div class="">
            <div id="step1-main" class="step1-main" v-on:mousedown="cmosDown" v-on:mousemove="cmosMove" v-on:mouseup="cmosUp">
                <canvas id="canvas" :width="tmpW" :height="tmpH">
                </canvas>
            </div>
            <div class="data-tips">
                <span class="tips-item">起点：({{ sx }}, {{ sy }})</span>
                <span class="tips-item">宽：{{ selW }}</span>
                <span class="tips-item">高：{{ selH }}</span>
            </div>
        </div>
        <el-aside class="step1-aside" width="37%">
            <div class="step1-row">
                <span class="aside-tips">项目名称：</span>
                <el-input v-model="pro_name" placeholder="请输入内容" size="small" style="width:120px; height:40px; line-height:40px;"></el-input>
            </div>
            <div class="step1-row">
                <span class="aside-tips">项目尺寸：</span>
                <el-select v-model="sel_val" placeholder="请选择" size="small" style="width:120px; height:40px; line-height:40px;">
                    <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
            sel_val: null,
            pro_name: '',
            options: [
                {
                    label: '规格一',
                    value: 1
                },
                {
                    label: '规格二',
                    value: 2
                }
            ],
            bInsertQRCode: '1',
            bMosDown: false,
            // tmpW: this.model.tmpW,
            // tmpH: this.model.tmpH,
            // sx: this.model.sx,
            // sy: this.mode.sy,
            ex: 0,
            ey: 0,
            canvas: null,
            ctx: null,
            mainObj: null,
            cnvSX: 0,
            cnvSY: 0,
            cnvEX: 0,
            cnvEY: 0
        }
    },
    computed: {
        tmpW:{
            get() {
                return this.$store.state.ProNew.step1.tmpW
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'tmpW', val})
            }
        },
        tmpH:{
            get() {
                return this.$store.state.ProNew.step1.tmpH
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'tmpW', tmpH})
            }
        },
        rw:{
            get() {
                return this.$store.state.ProNew.step1.rw
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'rw', val})
            }
        },
        rh:{
            get() {
                return this.$store.state.ProNew.step1.rh
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'rh', val})
            }
        },
        sx:{
            get() {
                return this.$store.state.ProNew.step1.sx
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'sx', val})
            }
        },
        sy:{
            get() {
                return this.$store.state.ProNew.step1.sy
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'sy', val})
            }
        },
        selW:{
            get() {
                return Math.abs(this.sx - this.ex);
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'selW', val})
            }
        },
        selH:{
            get() {
                return Math.abs(this.sy - this.ey)
            },
            set(val) {
                this.$store.commit('set_step1', {type: 'selH', val})
            }
        },
    },
    methods: {
        clearCanvas(){
            if(this.ctx){
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            }
        },
        getCX(e){
            if(e.target.id == 'canvas'){
                return e.offsetX;
            }else{
                if(e.offsetX < this.cnvSX){
                    return 0;
                }else if (e.offsetX > this.cnvEX) {
                    return this.canvas.width;
                }else{
                    return e.offsetX - this.cnvSX;
                };
            }
        },
        getCY(e){
            if(e.target.id == 'canvas'){
                return e.offsetY;
            }else{
                if(e.offsetY < this.cnvSY){
                    return 0;
                }else if (e.offsetY > this.cnvEY) {
                    return this.canvas.height;
                }else{
                    return e.offsetY - this.cnvSY;
                };
            }
        },
        getScaleCYWithCX(e){
            let sclH = Math.round(this.rh * this.selW / this.rw);
            let ry = this.getCY(e);  // 当前真实的y
            if(ry > this.sy){
                return sclH + this.sy;
            }else{
                return this.sy - sclH;
            }
        },
        cmosDown(e){
            this.bMosDown = true;
            if(!this.mainObj){
                this.mainObj = document.getElementById('step1-main');
            }
            if(!this.canvas){
                this.canvas = document.getElementById('canvas');
                this.cnvSX = this.canvas.offsetLeft - this.mainObj.offsetLeft;
                this.cnvSY = this.canvas.offsetTop - this.mainObj.offsetTop;
                this.cnvEX = this.canvas.width + this.cnvSX;
                this.cnvEY = this.canvas.height + this.cnvSY;
            }
            if(!this.ctx){
                this.ctx = this.canvas.getContext('2d');
                this.ctx.fillStyle = '#ff0000';
                this.ctx.strokeStyle = '#f30101'
            }
            this.ex = this.sx = this.getCX(e);
            this.ey = this.sy = this.getCY(e);
            this.clearCanvas();
        },
        cmosMove(e){
            if(this.bMosDown){
                this.ex = this.getCX(e);
                this.ey = this.getScaleCYWithCX(e);
                this.clearCanvas();
                this.ctx.setLineDash([6]);
                this.ctx.strokeRect(this.sx, this.sy, this.ex-this.sx, this.ey-this.sy);
                this.ctx.fillStyle="rgba(220,158,20,0.81)";
                this.ctx.fillRect(this.sx, this.sy, this.ex-this.sx, this.ey-this.sy);
            }
        },
        cmosUp(e){
            this.bMosDown = false;
            this.ex = this.getCX(e);
            this.ey = this.getScaleCYWithCX(e);
            this.clearCanvas();
            this.ctx.setLineDash([6]);
            this.ctx.strokeRect(this.sx, this.sy, this.ex-this.sx, this.ey-this.sy);
            this.ctx.fillStyle="rgba(220,158,20,0.81)";
            this.ctx.fillRect(this.sx, this.sy, this.ex-this.sx, this.ey-this.sy);
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
    height: 430px;
}

.step1-main {
    margin-right: 3px;
    border: 1px solid #A5A060;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 10px;
    text-align: center;
    height: 380px;
    cursor: crosshair;
}
#canvas {
    background: #d3dce6;
    border: 1px solid;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -150px;
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

</style>
