//store.js
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'



const state = () => ({
  isLoading:false,
  errMsg:""
})


const getters = {


  isLoading: (state) => {
    return state.isLoading;
  },
  errMsg: (state) => {
    return state.errMsg;
  }
}

const actions = {
  async register({ commit, state },email, password) {
    const auth = getAuth()
      commit('setIsLoading', true)
      await createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
              if (user) {
                  this.user = auth.currentUser
                  updateProfile(auth.currentUser, {
                      displayName: '',
                      photoURL: ''
                  })
                  sendEmailVerification(auth.currentUser)
                  commit('setIsLoading', false)
              }
          })
          .catch((error) => {
              console.log(error);
              commit('setIsLoading', false)
          })
  },
  
  async verify ({ commit, state }) {
    const auth = getAuth()
    console.log("-----------")
    console.log(this.errMsg)
    commit('setIsLoading', true)

     await sendEmailVerification(auth.currentUser)
        .then((user) => {
            console.log("test1")
            console.log(user);
            commit('setIsLoading', false)
        })
        .catch((error) => {
            console.log(error)
            switch (error.code) {
                case 'auth/too-many-requests':
                  commit('setErrMsg', 'You made to many requests please wait some time...')
                    break
                default:
                  commit('setErrMsg', 'Resending verification failed...')
                    break
            }  
            commit('setIsLoading', false)
        
           // console.log(this.errMsg)
        })
  }
}
const mutations = {
  setIsLoading (state, status) {
    state.isLoading = status
  },
  setErrMsg (state, msg) {
    state.errMsg = msg
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
