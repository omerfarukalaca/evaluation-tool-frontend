import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Languages from '@/components/Languages'
import LanguageDetail from '@/components/LanguageDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Languages
    },
    {
      path: '/languages/:id',
      name: 'LanguageDetail',
      component: LanguageDetail
    }
  ]
})
