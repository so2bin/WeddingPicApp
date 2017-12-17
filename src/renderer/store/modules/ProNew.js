let tmplst = require('./Tmplst.js')
let dftTmp = tmplst.default.state.tmpLst[0];
let dftImgRate = tmplst.default.state.imgRate[0];

const state = {
  step1: {
      /********  横向模板 ***********/
      lng: {
          // 横向模板相关固有属性
          tmpUrl: "",
          tmpW: dftTmp.showW,
          tmpH: dftTmp.showH,
          rw: dftImgRate.rw,
          rh: dftImgRate.rh,
          // 用户选择展示区域
          sx: 0,
          sy: 0,
          selW: 0,
          selH: 0
      },
      /*******  纵向模板 ******/
      hr: {
          // 横向模板相关固有属性
          tmpUrl: "",
          tmpW: dftTmp.showW,
          tmpH: dftTmp.showH,
          rw: dftImgRate.rw,
          rh: dftImgRate.rh,
          // 用户选择展示区域
          sx: 0,
          sy: 0,
          selW: 0,
          selH: 0
      }
  },
  step2: {
      val_fltr_blight: 50,
      val_fltr_contrast: 50
  },
  step3: {
    pro_title: '',
    pro_author: '',
    pro_phone: '',
    pro_company: '',
    pro_company_addr: ''
  },
  step4: {
      imgfldr_origin: 'D:\\Node\\Imgs\\origin',
      imgfldr_copy: 'D:\\Node\\Imgs\\copy',
      imgfldr_composed: 'D:\\Node\\Imgs\\composed'
  }
}

const mutations = {
  set_step1_lng(state, {type, val}){
      if(type == 'tmpUrl'){
          state.step1.lng.tmpUrl = val
      }else if (type == 'tmpW') {
          state.step1.lng.tmpW = val
      }else if (type == 'tmpH') {
          state.step1.lng.tmpH = val
      }else if (type == 'rw') {
          state.step1.lng.rw = val
      }else if (type == 'rh') {
          state.step1.lng.rh = val
      }else if (type == 'sx') {
          state.step1.lng.sx = val
      }else if (type == 'sy') {
          state.step1.lng.sy = val
      }else if (type == 'selW') {
          state.step1.lng.selW = val
      }else if (type == 'selH') {
          state.step1.lng.selH = val
      }
  },
  set_step1_hr(state, {type, val}){
      if(type == 'tmpUrl'){
          state.step1.hr.tmpUrl = val
      }else if (type == 'tmpW') {
          state.step1.hr.tmpW = val
      }else if (type == 'tmpH') {
          state.step1.hr.tmpH = val
      }else if (type == 'rw') {
          state.step1.hr.rw = val
      }else if (type == 'rh') {
          state.step1.hr.rh = val
      }else if (type == 'sx') {
          state.step1.hr.sx = val
      }else if (type == 'sy') {
          state.step1.hr.sy = val
      }else if (type == 'selW') {
          state.step1.hr.selW = val
      }else if (type == 'selH') {
          state.step1.hr.selH = val
      }
  },
  set_step2_filter(state, {type, val}) {
      if (type == 'blightness'){
          state.step2.val_fltr_blight = val
      } else if (type == 'contrast'){
          state.step2.val_fltr_contrast = val
      }
  },
  set_step3_pro (state, {type, val}) {
    if (type == 'title') {
      state.step3.pro_title = val
    } else if (type == 'author') {
      state.step3.pro_author = val
    } else if (type == 'phone') {
      state.step3.pro_phone = val
    } else if (type == 'company') {
      state.step3.pro_company = val
    } else if (type == 'company_addr') {
      state.step3.pro_company_addr = val
    }
  },
  set_step4_imgfldr (state, {type, val}) {
      if (type == 'origin'){
          state.step4.imgfldr_origin = val
      } else if (type == 'copy'){
          state.step4.imgfldr_copy = val
      } else if (type == 'composed'){
          state.step4.imgfldr_composed = val
      }
  }
}

const getters = {

}

export default{
  state,
  mutations,
  getters
}
