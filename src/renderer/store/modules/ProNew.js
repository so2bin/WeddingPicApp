const state = {
  step3: {
    pro_title: '',
    pro_author: '',
    pro_phone: '',
    pro_company: '',
    pro_company_addr: ''
  }
}

const mutations = {
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
  }
}

const getters = {
  pro_title: state => state.pro_title,
  pro_author: state => state.pro_author,
  pro_phone: state => state.pro_phone,
  pro_company: state => state.pro_company,
  pro_company_addr: state => state.pro_company_addr
}

export default{
  state,
  mutations,
  getters
}
