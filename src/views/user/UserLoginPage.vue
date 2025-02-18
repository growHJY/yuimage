<script setup lang="ts">
import { h, reactive } from 'vue'
import { userLoginUsingPost } from '@/api/yonghuqingqiu.ts'
import { FrownOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { loginUserStore } from '@/stores/loginUserStore.ts'

const router = useRouter()
const userLoginStore = loginUserStore()

const formState = reactive<API.UserLoginRequestDto>({
  userAccount: '1111',
  userPassword: '1111',
})
const onFinish = (values: API.UserLoginRequestDto) => {
  userLoginUsingPost(values).then((res: API.BaseResponseLoginUserVo_) => {
    if (res.code === 0) {
      notification.open({
        message: '登录成功',
        duration: 1,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
      })

      userLoginStore.setLoginUser(res.data)

      router.push({
        name: 'index',
        replace: true,
      })
    }else if(res.code === 50001){
      notification.open({
        message: res.message,
        duration: 1,
        icon: () => h(FrownOutlined, { style: 'color: red' }),
      })
    }
  })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <div id="userLogin">
    <div class="title-box">
      <h2 class="title">企业级智能云图库</h2>
      <span class="tip">智能管理的私人云图库</span>
    </div>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      class="a-from"
    >
      <a-form-item
        :label-col="{ offset: 3 }"
        name="userAccount"
        :rules="[{ required: true, message: '请输入你的用户名!' }]"
      >
        <a-input placeholder="请输入账户" v-model:value="formState.userAccount" />
      </a-form-item>

      <a-form-item name="userPassword" :rules="[{ required: true, message: '请输入你的密码!' }]">
        <a-input-password placeholder="请输入密码" v-model:value="formState.userPassword" />
      </a-form-item>

      <a-form-item label-align="right">
        <p>
          还没有账号？
          <router-link to="/user/register">立即注册</router-link>
        </p>
      </a-form-item>

      <a-form-item>
        <a-button style="width: 100%" type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
#userLogin {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title-box {
    .title {
      font-size: 30px;
      font-weight: bold;
    }

    .tip {
      display: block;
      text-align: right;
      font-size: 14px;
      margin-bottom: 15px;
      color: rgb(191, 191, 191);
    }
  }

  .a-from {
    width: 390px;
  }
}
</style>
