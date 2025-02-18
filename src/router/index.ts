import { createRouter, createWebHistory } from 'vue-router'
import { loginUserStore } from '@/stores/loginUserStore.ts'
import { notification } from 'ant-design-vue'
import { BorderTopOutlined } from '@ant-design/icons-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('@/views/user/UserLoginPage.vue'),
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import('@/views/user/UserRegisterPage.vue'),
    },
    {
      path: '/admin/user-manager',
      name: 'userManager',
      component: () => import('@/views/admin/UserManagerPage.vue'),
    },
    {
      path: '/admin/picture-manager',
      name: 'pictureManager',
      component: () => import('@/views/admin/PictureManagerPage.vue'),
    },
    {
      path: '/picture/add',
      name: 'pictureAdd',
      component: () => import('@/views/picture/AddPicturePage.vue'),
    },
    {
      path: '/picture/add/batch',
      name: 'pictureBatchAdd',
      component: () => import('@/views/picture/AddPictureBatchPage.vue'),
    },
    {
      path: '/picture/detail/:id',
      name: 'pictureDetail',
      component: () => import('@/views/picture/PictureDetailPage.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const loginUserStoreInstance = loginUserStore()
  const loginUser: API.LoginUserVo = loginUserStoreInstance.loginUser
  //const authRouterList = ['/admin/user-manager'] // 需要验证的路由
  if (to.path.startsWith('/admin')) {
    if (loginUser.userRole === 'admin') {
      next()
    } else {
      notification.warning({
        message: `权限不足`,
        description: '你暂时没有相关权限',
        placement: 'top',
      })
      next('/index')
    }
    return
  }
  next()
})

export default router
