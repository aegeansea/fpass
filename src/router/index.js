import Vue from 'vue'
import VueRouter from 'vue-router'
import { i18n, locales } from '../i18n'
import PageIndex from '../page/index'
import Page404 from '../page/404'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: PageIndex
    },
    ...locales.map(locale => ({
      name: locale,
      path: `/${locale}`,
      component: PageIndex
    })),
    {
      name: '404',
      path: '*',
      component: Page404
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'index') {
    return next(navigator.language)
  }
  i18n.locale = locales.indexOf(to.name) === -1
    ? (locales.indexOf(navigator.language) === -1 ? locales[0] : navigator.language)
    : to.name
  next()
})

export default router
