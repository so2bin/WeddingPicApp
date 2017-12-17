/*
*   每个项目需要上传到服务器的全局配置数据
*/

let tmp = {
    lng: {
        url: "",
        rw: 0,
        rh: 0
    },
    hr: {
        url: "",
        rw: 0,
        rh: 0
    }
}

const state = {
    tmp,

}

const mutations = {
    set_cnf_tmp_url(state, {type, val}){
        if(type=='lng'){
            state.tmp.lng.url = val;
        }else if(type == 'hr'){
            state.tmp.hr.url = val;
        }
    }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
