<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import { deletePictureUsingPost, getPictureUsingGet } from '@/api/tupianjiekou.ts'
import { filterTime, formatFileSize } from '@/utils/index.ts'
import { loginUserStore } from '@/stores/loginUserStore.ts'
import { saveAs } from 'file-saver'
import { message } from 'ant-design-vue'

let sureDetailModalShow = ref(false)
let confirmLoading = ref(false)

const [messageApi, contextHolder] = message.useMessage()
const route = useRoute()
const router = useRouter()
const loginUserInstance = loginUserStore()
const picture: API.PictureVO = reactive({})
onMounted(() => {
  getPictureUsingGet({ id: route.params?.id ?? '0' }).then((res: API.BaseResponsePictureVO_) => {
    if (res.code === 0) {
      Object.assign(picture, res.data)
    } else {
      messageApi.error(res.message)
    }
  })
})

const operationShow = computed(() => {
  return (
    picture.userId === loginUserInstance.loginUser?.id ||
    loginUserInstance.loginUser.userRole === 'admin'
  )
})

const doUpdate = () => {
  router.push({
    name: 'pictureAdd',
    query: {
      id: picture.id,
    },
  })
}

const doDelPicture = () => {
  sureDetailModalShow.value = true
}

const sureDel = () => {
  confirmLoading.value = true
  deletePictureUsingPost({ id: picture.id }).then((res: API.BaseResponseBoolean_) => {
    if (res.code === 0) {
      messageApi.success('删除成功')
      sureDetailModalShow.value = false
      confirmLoading.value = false
      router.back()
    } else {
      messageApi.error(res.message)
    }
  })
}
</script>

<template>
  <div id="pictureDetailPage">
    <a-modal
      v-model:open="sureDetailModalShow"
      title="确认要删除吗?"
      :confirm-loading="confirmLoading"
      @ok="sureDel"
    >
      <p>该操作不可逆</p>
    </a-modal>
    <context-holder />
    <a-row :gutter="16">
      <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <a-card hoverable style="max-width: 720px">
          <template #cover>
            <img alt="example" :src="picture.url" />
          </template>
          <a-card-meta :title="picture.name">
            <template #description>{{ picture.introduction }}</template>
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <a-descriptions title="图片信息" bordered layout="vertical">
          <a-descriptions-item label="图片大小"
            >{{ formatFileSize(picture.picSize) }}
          </a-descriptions-item>
          <a-descriptions-item label="图片格式">{{ picture.picFormat }}</a-descriptions-item>
          <a-descriptions-item label="图片缩放比例">{{ picture.picScale }}</a-descriptions-item>
          <a-descriptions-item label="图片宽度">{{ picture.picWidth }}</a-descriptions-item>
          <a-descriptions-item label="图片高度">{{ picture.picHeight }}</a-descriptions-item>
          <a-descriptions-item label="分类">{{ picture.category }}</a-descriptions-item>
          <a-descriptions-item label="发布时间" :span="3"
            >{{ filterTime(picture.createTime) }}
          </a-descriptions-item>
          <a-descriptions-item label="图片标签" :span="3" v-if="picture.tags?.length">
            <a-tag v-for="tag in picture.tags">{{ tag }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="操作" :span="3">
            <a-space>
              <a-button v-if="operationShow" @click="doUpdate">编辑</a-button>
              <a-button danger v-if="operationShow" @click="doDelPicture">删除</a-button>
              <a-button @click="saveAs(picture.url, picture.name)">下载</a-button>
            </a-space>
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less"></style>
