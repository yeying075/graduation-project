import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main/user'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/UserView.vue')
        },
        {
          path: 'project',
          name: 'project',
          component: () => import('@/views/ProjectView.vue')
        },
        {
          path: 'resume',
          name: 'resume',
          component: () => import('@/views/ResumeView.vue')
        },
        {
          path: 'interview',
          name: 'interview',
          component: () => import('@/views/InterviewView.vue')
        },
        {
          path: 'my-project',
          name: 'my-project',
          component: () => import('@/views/MyProject.vue')
        }
      ]
    }
  ]
})

const nonAuthUrls = ['/login']
router.beforeEach((to, from, next) => {
  const identityStore = useIdentityStore()
  if (nonAuthUrls.includes(to.path)) {
    next()
    return
  }
  const token = identityStore.identity.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
