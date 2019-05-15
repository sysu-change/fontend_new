import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from '/auth'
import questionaire from '/questionaire'


const store = new Vuex.Store({
  modules: {
    auth,
    questionaire
  }
})

export default store