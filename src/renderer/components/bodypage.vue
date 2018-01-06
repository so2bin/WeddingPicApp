<template lang="">
<div class="bodypage">
    <h2 class="help-title">朝歌婚姻相册系统<span style="font-size:16px;">v1.0</span></h2>
    <div class="pic-show">
        <el-row style="height:200px;">
            <el-col style="line-height:18px;" :span="10" v-for="(item, idx) in suiteList"
                :key="idx" :offset="idx > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.main_img" class="image" style="height:200px;">
                    <div style="padding: 14px;">
                        <span>{{ item.title }}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ item.create_time }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script lang="">
export default {
    data () {
        return {
            hasInternet: false,
            DOMAIN: this.$store.state.conf.DOMAIN,
            API_TEST: this.$store.state.conf.API_TEST,
            SUITE_LIST: this.$store.state.conf.SUITE_LIST,
            datalist: [
                {imgDemoUrl: 'http://www.twgreatdaily.com/imgs/image/105/10588367.jpg'},
                {imgDemoUrl: 'http://www.twgreatdaily.com/imgs/image/105/10588367.jpg'}
            ],
            suiteMap: new Map(), // 维护suiteList的id=>idx的映射
            /* {title, main_img, head_img, img_num, like_num,
                 favor_num, creator, beautor, create_time}
            */
            suiteList: []
        }
    },
    computed: {

    },
    methods: {
        // 测试能否连接服务器
        testInternet(){
            return this.$http.get(this.API_TEST)
                .then(res=>{
                    this.hasInternet = true;
                })
                .catch((err)=>{
                    this.hasInternet = false;
                })
        },
        // update from remote server
        updateSuiteListFromServer(){
            if(!this.hasInternet){
                return false;
            }
            this.$http.get(this.SUITE_LIST)
                .then((res)=>{
                    if(res.data.status){
                        throw new Error(res.msg);
                    }
                    let items = res.data.data;
                    for(let itm of items){
                        if(this.suiteMap.has(itm.id)){
                            // 对比更新数据并保存
                        }else{
                            // 增加新数据并保存
                            this.suiteList.push(itm);
                            this.suiteMap.set(itm.id, this.suiteList.length-1);
                        }
                    }
                })
                .catch((err)=>{
                    console.error(err);
                })
        },
    },
    created: async function(){
        await this.testInternet();
    },
    mounted(){
        setTimeout(()=>{
            this.updateSuiteListFromServer();
        }, 1000)
    }
}
</script>

<style lang="" scoped>
.help-title {
    height:40px;
    line-height:40px;
    margin:0 0px;
}
.pic-show{
    height: 500px;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
