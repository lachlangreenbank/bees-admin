import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from '@/router'

Vue.use(Vuex)

let getToken = function () {
  if ($cookies.get("Token-l3253h")) {
    return $cookies.get("Token-l3253h")
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
  	milestoneCreateStatus: false,
    milestoneLogs: {}
  },
  mutations: {
    unsetUser (state, user) {
      $cookies.remove("Token-l3253h")
      // $cookies.remove("Token")
      return user
    },
    setUser (state, user) {
      console.log(user)
      state.user = user
      $cookies.set("Token-l3253h", user.Token)
      if ($cookies.get("Token-l3253h")) {
        router.push('agreement-list')
      }
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
    deleteMilestones (state, milestone) {
      console.log(milestone)
      state.milestone = milestone
    },
  	setCurrentMilestone (state, currentMilestones) {
      console.log(currentMilestones)
      state.currentMilestones = currentMilestones
      state.milestoneCreateStatus = true

      setTimeout(function  () {
        state.milestoneCreateStatus = false
      }, 100)
      
  	},
    setMilestoneLogs (state, milestoneLogs) {
      console.log(milestoneLogs)
      state.milestoneLogs = milestoneLogs
    },
  },
  actions: {
    logout(context, Params) {
      context.commit('unsetUser')
      window.location.reload()
    },    
    login(context, Params) {
      console.log('getting data')
      var config = { headers: {} };
      return new Promise(function(resolve, reject) {
        axios
          .post('http://pha-bees.sodadev.com/api/user/validate', {
              ...Params
            }, config)
          // .then(res => (context.commit('setUser', res.data, { root: true })))
          .then(function (res) {
            (context.commit('setUser', res.data, { root: true }))
            resolve(res)
          })
        })
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
	          ...Params
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

      return new Promise(function(resolve, reject) {
  	    axios
  	      .post('http://pha-bees.sodadev.com/api/milestone/create', {
  	          Token: getToken(),
  	          ...Params
  	        })
  	      .then(function (res) {
            (context.commit('setCurrentMilestone', res.data, { root: true }))
            resolve(res)
          })
        })
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
    deleteMilestones(context, Params) {
      console.log('getting data')

      return new Promise(function(resolve, reject) {
        axios
          .post('http://pha-bees.sodadev.com/api/milestone/delete', {
              Token: getToken(),
              ...Params
            })
          .then(function (res) {
            (context.commit('setCurrentMilestone', res.data, { root: true }))
            resolve(res)
          })
        })
    },
    getMilestoneLogs(context, Params) {
      console.log('getting data')

      return new Promise(function(resolve, reject) {
        axios
          .post('http://pha-bees.sodadev.com/api/milestone_logs/single', {
              Token: getToken(),
              ...Params
            })
          .then(function (res) {
            (context.commit('setMilestoneLogs', res.data, { root: true }))
            resolve(res)
          })
        })
    },
    getAllMilestoneLogs(context, Params) {
      console.log('getting data')

      return new Promise(function(resolve, reject) {
        axios
          .post('http://pha-bees.sodadev.com/api/milestone_logs/all', {
              Token: getToken(),
              ...Params
            })
          .then(function (res) {
            (context.commit('setMilestoneLogs', res.data, { root: true }))
            resolve(res)
          })
        })
    },
    createMilestoneLog(context, Params) {
      console.log('getting data')

      return new Promise(function(resolve, reject) {
        axios
          .post('http://pha-bees.sodadev.com/api/milestone_logs/create', {
              Token: getToken(),
              ...Params
            })
          .then(function (res) {
            // (context.commit('setCurrentMilestoneLogs', res.data, { root: true }))
            console.log('Set milestone')
            console.log(res)
            resolve(res)
          })
        })
    },
  }
})
