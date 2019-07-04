import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import MilestoneList from './views/MilestoneList'
import MilestoneDetail from './views/MilestoneDetail'
import AgreementList from './views/AgreementList'
import AgreementMilestones from './views/AgreementMilestones'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/milestone-list',
      name: 'milestone-list',
      component: MilestoneList
    },
    {
      path: '/milestone-detail/:milestone_id',
      name: 'milestone-detail',
      component: MilestoneDetail
    },
    {
      path: '/agreement-list',
      name: 'agreement-list',
      component: AgreementList
    },
    {
      path: '/agreement-milestones/:agreement',
      name: 'agreement-milestones',
      component: AgreementMilestones
    },
    {
      path: '/agreement-milestones/:agreement/:milestone_id/m_id/:milestone_pk_id',
      name: 'agreement-milestone-detail',
      component: MilestoneDetail
    },
  ]
})
