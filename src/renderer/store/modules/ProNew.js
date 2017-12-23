let url = require('url')
let tmplst = require('./Tmplst.js')
let procnf = require('./ProCnf')
let dftTmpLng = tmplst.default.state.tmpLst.lng[0];
let dftTmpHr = tmplst.default.state.tmpLst.hr[0];
let dftImgRate = tmplst.default.state.imgRate[0];
let dftImgRealSize = tmplst.default.state.tmpRealSize[0];

const state = {
  // 当前步骤
  step: 1,
  step1: {
      // 项目名称
      proName: "",
      // 项目名称
      proSizeIdx: 0,
      // 照片尺寸
      proImgSizeIdx: 0,
      /********  横向模板 ***********/
      lng: {
          // 纵向模板相关固有属性
          tmpUrl: "",
          tmpW: dftTmpLng.showW,
          tmpH: dftTmpLng.showH,
          rw: dftImgRate.rh,
          rh: dftImgRate.rw,
          // 用户选择展示区域
          sx: 0,
          sy: 0,
          ex: 0,
          ey: 0,
          selW: 0,
          selH: 0,
          // 当前模板对应的真实的尺寸
          realW: dftImgRealSize.w,
          realH: dftImgRealSize.h,
      },
      /*******  横向向模板 ******/
      hr: {
          // 横向模板相关固有属性
          tmpUrl: "",
          tmpW: dftTmpHr.showW,
          tmpH: dftTmpHr.showH,
          rw: dftImgRate.rw,
          rh: dftImgRate.rh,
          // 用户选择展示区域
          sx: 0,
          sy: 0,
          ex: 0,
          ey: 0,
          selW: 0,
          selH: 0,
          // 当前模板对应的真实的尺寸
          realW: dftImgRealSize.h,
          realH: dftImgRealSize.w,
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
  set_pronew(state, {type, val}){
      if(type == 'step'){
          state.step = val
      }
  },
  set_pro_info(state, {type, val}){
      if(type == 'proname'){
          state.step1.proName = val;
      }else if(type == 'prosizeidx'){
          state.step1.proSizeIdx = val;
      }else if(type == 'proimgidx'){
          state.step1.proImgSizeIdx = val;
      }else if(type == 'step'){
          state.step1.step = val;
      }
  },
  set_step1_lng(state, {type, val}){
      if(type == 'tmpUrl'){
          state.step1.lng.tmpUrl = url.resolve('http://localhost:9080',val);
          console.log(state.step1.lng.tmpUrl);
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
      }else if (type == 'ex') {
          state.step1.lng.ex = val
      }else if (type == 'ey') {
          state.step1.lng.ey = val
      }else if (type == 'selW') {
          state.step1.lng.selW = val
      }else if (type == 'selH') {
          state.step1.lng.selH = val
      }else if(type == 'realsize') {
          state.step1.lng.realW = val.w;
          state.step1.lng.realH = val.h;
      }
  },
  set_step1_hr(state, {type, val}){
      if(type == 'tmpUrl'){
        state.step1.hr.tmpUrl = url.resolve('http://localhost:9080', val);
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
      }else if (type == 'ex') {
          state.step1.hr.ex = val
      }else if (type == 'ey') {
          state.step1.hr.ey = val
      }else if (type == 'selW') {
          state.step1.hr.selW = val
      }else if (type == 'selH') {
          state.step1.hr.selH = val
      }else if(type == 'realsize') {
          state.step1.hr.realW = val.h;
          state.step1.hr.realH = val.w;
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
