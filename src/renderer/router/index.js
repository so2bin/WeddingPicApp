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
        },
        {
          path: 'step3', component: require('@/components/pro-new/step3').default
        },
        {
          path: 'step4', component: require('@/components/pro-new/step4').default
        },
        {
          path: 'step5', component: require('@/components/pro-new/step5').default
        },
        {
          path: 'step6', component: require('@/components/pro-new/step6').default
        }
      ]
    },
    {
      path: '/work',
      name: 'work',
      component: require('@/components/work').default
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
