export default {
    namespaced: true,
    state: {
        locale: 'zh_CN'
    },
    
    mutations:{
        updateLocale(state, val) {
            state.locale = val
        }
    },
  
    actions:{
        updateLocale( {commit}, val) {
            commit('updateLocale', val)
        }
    },
  
    getters:{}
}