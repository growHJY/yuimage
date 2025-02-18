<script setup lang="ts">
import { h, reactive } from 'vue'
import { userLoginUsingPost, userRegisterUsingPost } from '@/api/yonghuqingqiu.ts'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formState = reactive<API.UserRegisterRequestDto>({
  userAccount: '1111',
  userPassword: '1111',
  checkPassword: '1111',
})
const onFinish = (values: API.UserLoginRequestDto) => {
  userRegisterUsingPost(values).then((res: API.BaseResponse_) => {
    if (res.code === 0) {
      notification.open({
        message: '注册成功',
        duration: 1,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
      })

      router.push({
        name: 'login',
        replace: true,
      })
    } else {
      notification.open({
        message: res.message,
        duration: 1,
        icon: () => h(FrownOutlined, { style: 'color: red' }),
      })
    }
  })
}

const formRules = {
  userAccount: [
    {
      required: true,
      message: '请输入账户',
    },
  ],
  userPassword: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
  checkPassword: [
    {
      validator: (_, value, callback) => {
        if (value.trim().length === 0) {
          return Promise.reject('密码不能为空')
        } else if (value != formState.userPassword) {
          return Promise.reject('两次密码不一致')
        }
        return Promise.resolve()
      },
    },
  ],
}

const onFinishFailed = (errorInfo: any) => {
  notification.open({
    message: errorInfo.errorFields[0].errors[0],
    duration: 1,
    icon: () => h(FrownOutlined, { style: 'color: red' }),
  })
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
      :rules="formRules"
    >
      <a-form-item :label-col="{ offset: 3 }" name="userAccount">
        <a-input placeholder="请输入账户" v-model:value="formState.userAccount" />
      </a-form-item>

      <a-form-item name="userPassword">
        <a-input-password placeholder="请输入密码" v-model:value="formState.userPassword" />
      </a-form-item>

      <a-form-item name="checkPassword">
        <a-input-password placeholder="与密码一致" v-model:value="formState.checkPassword" />
      </a-form-item>

      <a-form-item label-align="right">
        <p>
          以后账号？
          <router-link to="/user/login">返回登录</router-link>
        </p>
      </a-form-item>

      <a-form-item>
        <a-button style="width: 100%" type="primary" danger html-type="submit">注册</a-button>
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
