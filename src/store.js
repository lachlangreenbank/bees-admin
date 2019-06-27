import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from '@/router'

Vue.use(Vuex)

let getToken = function () {
  if ($cookies.get("Token")) {
    return $cookies.get("Token")
  } else {
    router.push('../../../../../../../login')
  }
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
    setUser (state, user) {
      console.log(user)
      state.user = user
      $cookies.set("user", user)
      return user
    },
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
    login(context, Params) {
      console.log('getting data')
      var config = {
          headers: {}
      };

      axios
        .post('http://pha-bees.sodadev.com/api/user/validate', {
            Token: "7650307942108497196214049692",
            User_Email: "Officer01@gmail.com",
            User_Password: "Officer01@gmail.com"
          }, config)
        .then(res => (context.commit('setUser', res.data, { root: true })))
    },
  	getAgreements(context, Params) {
	    console.log('getting data')
      return new Promise(function(resolve, reject) {
  	    axios
  	      .post('http://pha-bees.sodadev.com/api/agreement/single', {
  	          Token: getToken(),
  	          ...Params
  	        })
          .then(function (res) {
            (context.commit('setAgreements', res.data, { root: true }))
            resolve(res)
          })
        })
	  },
    getAllAgreements(context, Params) {
      console.log('getting data')
      var config = {
          headers: {}
      };

      return new Promise(function(resolve, reject) {
        axios
          .post('http://pha-bees.sodadev.com/api/agreement/all', {
              Token: getToken(), 
            }, config)
          .then(function (res) {
            (context.commit('setAgreements', res.data, { root: true }))
            resolve(res)
          })
        })
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

      return new Promise(function(resolve, reject) {
  	    axios
  	      .post('http://pha-bees.sodadev.com/api/milestone/all', {
  	          Token: getToken(),
  	        })
          .then(function (res) {
            (context.commit('setMilestones', res.data, { root: true }))
            resolve(res)
          })
        })
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
