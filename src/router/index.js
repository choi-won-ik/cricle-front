import { createWebHistory, createRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';


import LoginView from "/src/pages/member/Login.vue"
import LoginSuccess from "/src/pages/member/LoginSuccess.vue"
import Signup from '/src/pages/member/Signup.vue';
import SignupSuccess from '/src/pages/member/SignupSuccess.vue';



const checkLogin = async (from, to, next) => {
  const memberStore = useMemberStore();
  // await memberStore.loginCheck();
  if(memberStore.isLogin) {
    return next();
  }

  next("/login");
}

const routes = [


  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },

  {
    path: '/success',
    name: 'success',
    component: LoginSuccess
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

  {
    path: '/signup_success',
    name: 'SignupSuccess',
    component: SignupSuccess
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router;