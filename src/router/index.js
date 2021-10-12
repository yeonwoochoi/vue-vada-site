import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from "vue-cookies";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(
        '@/layout/default/Index'
        ),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(
            '@/views/default/Home'
            )
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(
            '@/views/default/about/About'
            )
      },
      {
        path: '/service',
        name: 'Service',
        component: () => import(
            '@/views/default/service/Service'
            )
      },
      {
        path: '/support',
        name: 'Notice',
        component: () => import(
            '@/views/default/support/Notice'
            )
      },
      {
        path: '/support/faq',
        name: 'Faq',
        component: () => import(
            '@/views/default/support/Faq'
            )
      },
      {
        path: '/support/qna',
        name: 'Qna',
        component: () => import(
            '@/views/default/support/Qna'
            )
      },
      {
        path: '/support/privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import(
            '@/views/default/support/PrivacyPolicy'
            )
      },
      {
        path: '/support/terms-of-use',
        name: 'TermsOfUse',
        component: () => import(
            '@/views/default/support/TermsOfUse'
            )
      }
    ]
  },
  {
    path: '/authentication',
    component: () => import(
        '@/layout/authentication/Index'
        ),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import(
            '@/views/authentication/SignIn'
            )
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import(
            '@/views/authentication/SignUp'
            )
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log(`${from.name} => ${to.name}`)
  if (VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') !== null) {
    await this.$store.dispatch('user/requestRefreshToken')
  }
  if (VueCookies.get('accessToken') !== null) {
    return next();
  }
  if (VueCookies.get('accessToken') === null && VueCookies.get('refreshToken') === null && to.name !== 'SignIn') {
    return next('authentication/sign-in');
  }
  return next();
})

export default router
