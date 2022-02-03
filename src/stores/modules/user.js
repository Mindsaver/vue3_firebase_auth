//store.js

const state = () => ({
  user: [],
  username:""
});

const getters = {
  user: (state) => {
    return state.user;
  },
  loggedIn: (state) => {
    if (state.user) return true;
    return false;
  },
  username: (state) => {
    return state.username
  },
  email: (state) => {
    return state.user?.email
  },
  isPasswordUsed: (state) => {
    return state.user?.providerData.find((x)=>{return x.providerId == "password"}) != null
  }

};

const actions = {};
const mutations = {
  setUser(state, user) {
    state.user = user;
    if(user != null)
      state.username = user.displayName
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
