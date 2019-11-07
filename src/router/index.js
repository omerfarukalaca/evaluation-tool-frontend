import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Languages from '@/components/Languages'
import LanguageDetail from '@/components/LanguageDetail'
import MetamodelMatch from '@/components/MetamodelMatch'
import Evaluate from '@/components/Evaluate'
import AddLanguage from '@/components/AddLanguage'

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
    },
    {
      path: '/evaluate/:id/case-study/:caseStudy/:flag',
      name: 'Evaluate',
      component: Evaluate,
    },
    {
      path: '/add-language',
      name: 'AddLanguage',
      component: AddLanguage
    },
    {
      path: '/metamodel-match/:id',
      name: 'MetamodelMatch',
      component: MetamodelMatch
    }
  ]
})
