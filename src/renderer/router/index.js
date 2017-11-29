import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bodypage',
      component: require('@/components/bodypage').default
    },
    {
      path: '/pronew',
      name: 'pronew',
      component: require('@/components/pro-new').default,
      children: [
        {
          path: '', component: require('@/components/pro-new/step1').default
        },
        {
          path: 'step1', component: require('@/components/pro-new/step1').default
        },
        {
          path: 'step2', component: require('@/components/pro-new/step2').default
        }
      ]
    },
    {
      path: '/help',
      name: 'help',
      component: require('@/components/help').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
