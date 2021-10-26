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
        path: '/members',
        name: 'Members',
        component: () => import(
            '@/views/default/Members'
            )
      },
      {
        path: '/research',
        name: 'Research',
        component: () => import(
            '@/views/default/Research'
            )
      },
      {
        path: '/publications',
        name: 'Publications',
        component: () => import(
            '@/views/default/Publications'
            )
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import(
            '@/views/default/Projects'
            )
      },
      {
        path: '/news',
        name: 'News',
        component: () => import(
            '@/views/default/News'
            )
      },
      {
        path: '/seminar',
        name: 'Seminar',
        component: () => import(
            '@/views/default/Seminar'
            )
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import(
            '@/views/default/Contact'
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
        path: '',
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

  const authenticatedPages = ["Seminar"];

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
            return next('/authentication');
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
