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
            '@/views/default/Member/Members'
            )
      },
      {
        path: '/members/input',
        name: 'MemberInput',
        component: () => import(
            '@/views/default/Member/MemberInput'
            )
      },
      {
        path: '/research',
        name: 'Research',
        component: () => import(
            '@/views/default/Research/Research'
            )
      },
      {
        path: '/publications',
        name: 'Publications',
        component: () => import(
            '@/views/default/Publication/Publications'
            )
      },
      {
        path: '/publications/input',
        name: 'PublicationsInput',
        component: () => import(
            '@/views/default/Publication/PublicationInput'
            )
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import(
            '@/views/default/Project/Projects'
            )
      },
      {
        path: '/projects/content',
        name: 'ProjectContent',
        component: () => import(
            '@/views/default/Project/ProjectContent'
            )
      },
      {
        path: '/projects/input',
        name: 'ProjectInput',
        component: () => import(
            '@/views/default/Project/ProjectInput'
            )
      },
      {
        path: '/news',
        name: 'News',
        component: () => import(
            '@/views/default/News/News'
            )
      },
      {
        path: '/news/content',
        name: 'NewsContent',
        component: () => import(
            '@/views/default/News/NewsContent'
            )
      },
      {
        path: '/news/input',
        name: 'NewsInput',
        component: () => import(
            '@/views/default/News/NewsInput'
            )
      },
      {
        path: '/seminar',
        name: 'Seminar',
        component: () => import(
            '@/views/default/Seminar/Seminar'
            )
      },
      {
        path: '/seminar/content',
        name: 'SeminarContent',
        component: () => import(
            '@/views/default/Seminar/SeminarContent'
            )
      },
      {
        path: '/seminar/input',
        name: 'SeminarInput',
        component: () => import(
            '@/views/default/Seminar/SeminarInput'
            )
      },
      {
        path: '/lecture',
        name: 'Lecture',
        component: () => import(
            '@/views/default/Lecture/Lecture'
            )
      },
      {
        path: '/lecture/content',
        name: 'LectureContent',
        component: () => import(
            '@/views/default/Lecture/LectureContent'
            )
      },
      {
        path: '/lecture/input',
        name: 'LectureInput',
        component: () => import(
            '@/views/default/Lecture/LectureInput'
            )
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import(
            '@/views/default/Contact/Contact'
            )
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import(
            '@/layout/test/Test'
            ),
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
      /*
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import(
            '@/views/authentication/sign-up/SignUp'
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
      },
       */
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
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import(
            '@/views/authentication/reset-password/ResetPassword'
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
  //console.log(`${from.name} => ${to.name}`)

  let accessToken = VueCookies.get('accessToken');
  const authenticatedPages = ["Seminar", "SeminarContent", "SeminarInput", "MemberInput", "PublicationInput", "ProjectInput", "NewsInput", "ResetPassword", "LectureInput"];

  if (accessToken === null) {
    //console.log("Routing : reissuing access token...")
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
    //console.log("Routing : Certified")
    return next();
  }
})

export default router
