export default {
    namespaced: true,
    state: {
        token: '',
        loggedIn: true,
        isSubscribed: true
    },
    
    mutations:{
        updateToken(state, val) {
            state.token = val
        }
    },
  
    actions:{
        updateToken( {commit}, val) {
            commit('updateToken', val)
        }
    },
  
    getters:{

    }
}