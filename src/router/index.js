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
        path: '/api',
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
            '@/views/authentication/sign-in/SignIn'
            )
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import(
            '@/views/authentication/sign-up/SignUp'
            )
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import(
            '@/views/authentication/forgot-password/ForgotPassword'
            )
      },
      {
        path: 'forgot-password-done',
        name: 'ForgotPasswordDone',
        component: () => import(
            '@/views/authentication/forgot-password/ForgotPasswordDone'
            )
      },
      {
        path: 'signup-agreement',
        name: 'SignUpAgreement',
        component: () => import(
            '@/views/authentication/sign-up/SignUpAgreement'
            )
      },
      {
        path: 'signup-done',
        name: 'SignUpDone',
        component: () => import(
            '@/views/authentication/sign-up/SignUpDone'
            )
      }
    ]
  },
  {
    path: "*",
    name: "notFound",
    component: () => import('@/layout/etc/NotFound')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import store from '@/store/index'

router.beforeEach(async (to, from, next) => {
  console.log(`${from.name} => ${to.name}`)

  let accessToken = VueCookies.get('accessToken');

  const authenticatedPages = ["Qna", "Faq"];

  if (accessToken === null) {
    console.log("Routing : reissuing access token...")
    let params = {
      "id" : localStorage.id
    };
    await store.dispatch('user/requestRefreshToken', params).then(
        () => {
          return next();
        },
        () => {
          if (authenticatedPages.indexOf(to.name) > -1) {
            return next('/authentication/sign-in');
          } else {
            return next();
          }
        }
    )
  }
  else {
    console.log("Routing : Certified")
    return next();
  }
})

export default router
