import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    apiData: []
  },
  getters: {
  },
  mutations: {
    setApiData(state) {
      state.apiData=state
    }
  },
  actions: {
    fetchAPI: async () => {
      const res = await axios.get('http://interviewapi.ngminds.com/api/getAllProducts');
      this.setApiData(res.data)
    }
  },
  modules: {
  }
})
