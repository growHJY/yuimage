<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import { type MenuProps, message } from 'ant-design-vue'
import {
  CloudUploadOutlined,
  HomeOutlined,
  LoginOutlined,
  PictureOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { loginUserStore } from '@/stores/loginUserStore.ts'
import { userLogoutUsingPost } from '@/api/yonghuqingqiu.ts'

const userLoginStore = loginUserStore()
const router = useRouter()
const route = useRoute()
const current = ref<string[]>(['/index'])
const items = ref<MenuProps['items']>([
  {
    key: '/index',
    label: '主页',
    icon: () => h(HomeOutlined),
    title: '主页',
  },
  {
    key: '/picture/add',
    label: '图片上传',
    icon: () => h(CloudUploadOutlined),
    title: '图片上传',
  },
  {
    key: '/admin/user-manager',
    label: '用户管理',
    icon: () => h(TeamOutlined),
    title: '用户管理',
  },
  {
    key: '/admin/picture-manager',
    label: '图片管理',
    icon: () => h(PictureOutlined),
    title: '图片管理',
  },
])

const doSelect = ({ item, key, selectedKeys }) => {
  router.push({
    path: key,
  })
}

const doLogout = () => {
  userLogoutUsingPost().then((res: API.BaseResponse_) => {
    if (res.code === 0) {
      userLoginStore.clearLoginUser()
      router.push({
        name: 'login',
        replace: true,
      })
    }
  })
}

const reloadTabbar = () => {
  return items.value.filter((item) => {
    if (userLoginStore.loginUser.userRole != 'admin') {
      return !item.key.startsWith('/admin')
    }
    return true
  })
}

const menuItems = computed(() => {
  return reloadTabbar()
})

watch(route, (val) => {
  current.value = [val.path]
})
</script>

<template>
  <div id="basicLayout">
    <a-layout class="layout">
      <a-layout-header class="header">
        <a-row :wrap="false">
          <a-col class="right-col" flex="150px">
            <img src="../assets/logo.png" alt="logo" />
            <span>智能云图库</span>
          </a-col>
          <a-col flex="auto">
            <a-menu
              @select="doSelect"
              v-model:selectedKeys="current"
              mode="horizontal"
              :items="menuItems"
            />
          </a-col>
          <a-col flex="150px">
            <router-link to="/user/login" v-if="!userLoginStore.loginUser.id">
              <a-button type="primary">登录</a-button>
            </router-link>
            <a-dropdown v-else>
              <a-avatar shape="square">
                <template #icon>
                  <img :src="userLoginStore.loginUser.userAvatar" alt="avatar" />
                </template>
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-space size="small">
                      <LoginOutlined />
                      <a href="javascript:;" @click="doLogout">退出登录</a>
                    </a-space>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> @Design By Hjy</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped lang="less">
#basicLayout {
  height: 100vh;

  .layout {
    height: 100%;

    .header {
      background-color: #fff;
      margin-bottom: 10px;
      padding-inline: 20px;

      .right-col {
        img {
          width: 48px;
          height: 48px;
          margin-right: 15px;
        }
      }
    }

    .layout-content {
      background-color: #fff;
      padding: 10px 20px 20px;
      overflow-y: scroll;
    }

    .footer {
      font-size: 20px;
      text-align: center;
      color: #71c9ce;
    }
  }
}
</style>


