const state = {
  step3: {
    img1Path:"",  // back image 1
    img2Path:""
  }
}

const mutations = {
    set_step3_backimg(state, obj){
      if (obj.img1){
        state.step3.img1Path = obj.img1
      }else{
        state.step3.img2Path = obj.img2
      }
    }
}

export default{
  state,
  mutations
}
