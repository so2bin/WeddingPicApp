const state = {
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
