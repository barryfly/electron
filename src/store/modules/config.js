export default {
    namespaced: true,
    state: {
        collapsed: false,
    },
    
    mutations:{
        updateCollapse(state, val) {
            state.collapsed = val
        }
    },
  
    actions:{
        updateCollapse( {commit}, val) {
            commit('updateCollapse', val)
        }
    },
  
    getters:{

    }
}