import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from '@/router'

Vue.use(Vuex)

let getToken = function () {
  // if ($cookies.get("Token")) {
    return "9444134612138690191244065242"
// $cookies.get("Token")
  // } else {
    // router.push('login')
  // }
}

export default new Vuex.Store({
  state: {
  	agreements: {},
  	milestones: {},
  	milestone: {},
  	currentAgreement: {},
  	currentMilestone: {},
  	milestoneCreateStatus: false
  },
  mutations: {
  	setAgreements (state, agreements) {
      console.log(agreements)
      state.agreements = agreements
  	},
  	setCurrentAgreement (state, currentAgreement) {
      console.log(currentAgreement)
      state.currentAgreement = currentAgreement
  	},
  	setMilestones (state, milestones) {
      console.log(milestones)
      state.milestones = milestones
  	},
  	setMilestone (state, milestone) {
      console.log(milestone)
      state.milestone = milestone
  	},
  	setCurrentMilestone (state, currentMilestones) {
      console.log(currentMilestones)
      state.currentMilestones = currentMilestones
      state.milestoneCreateStatus = true
  	},
  },
  actions: {
  	getAgreements(context, Params) {
	    console.log('getting data')

	    axios
	      .post('http://pha-bees.sodadev.com/api/agreement/single', {
	          Token: getToken(),
	          Id: 55 // Params.Id 
	        })
	      .then(res => (context.commit('setAgreements', res.data, { root: true })))
	  },
	  getMilestone(context, Params) {
	    console.log('getting data')

	    axios
	      .post('http://pha-bees.sodadev.com/api/milestone/single', {
	          Token: getToken(),
	          Id: Params.Id
	        })
	      .then(res => (context.commit('setMilestone', res.data, { root: true })))
	  },
	  getMilestones(context, Params) {
	    console.log('getting data')

	    axios
	      .post('http://pha-bees.sodadev.com/api/milestone/all', {
	          Token: getToken(),
	        })
	      .then(res => (context.commit('setMilestones', res.data, { root: true })))
	  },
	  setMilestone(context, Params) {
	    console.log('getting data')

	    axios
	      .post('http://pha-bees.sodadev.com/api/milestone/create', {
	          Token: getToken(),
	          ...Params
	        })
	      .then(res => (context.commit('setCurrentMilestone', res.data, { root: true })))
	  },
    updateMilestone(context, Params) {
      console.log('getting data')

      axios
        .post('http://pha-bees.sodadev.com/api/milestone/update', {
            Token: getToken(),
            ...Params
          })
        .then(res => (context.commit('setCurrentMilestone', res.data, { root: true })))
    },
  }
})
