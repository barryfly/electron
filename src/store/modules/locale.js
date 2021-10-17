export default {
    namespaced: true,
    state: {
        locale: 'zh-cn'
    },
    
    mutations:{
        setLocale(state, val) {
            state.locale = val
        }
    },
  
    actions:{
        setLocale( {commit}, val) {
            commit('setLocale', val)
        }
    },
  
    getters: {

    }
}