<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { onMounted, reactive, ref } from 'vue'
import {
  getPictureAdminUsingGet,
  getPictureUsingGet,
  updatePictureUsingPost,
  uploadPictureUrlUsingPost,
} from '@/api/tupianjiekou.ts'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { categoryTagStore } from '@/stores/categoryTagStore.ts'

const [messageApi, contextHolder] = message.useMessage()

const router = useRouter()
const route = useRoute()

const picture = reactive<API.PictureVO>({})
const categoryTagList = reactive({} as API.PictureTagCategory)

let uploadMethodKey = ref<'file' | 'url'>('file')
let uploadUrl = ref('')

const categoryTagStoreInstance = categoryTagStore()

const getPictureInfo = (pictureInfo: API.PictureVO) => {
  picture.category = pictureInfo.category
  picture.introduction = pictureInfo.introduction
  picture.name = pictureInfo.name
  picture.tags = pictureInfo.tags
  picture.url = pictureInfo.url
  picture.id = pictureInfo.id
}

const onFinish = () => {
  updatePictureUsingPost(picture).then((res: API.BaseResponseBoolean_) => {
    if (res.code === 0) {
      message.success('发布成功')
      if (route.query?.from === '/admin/picture-manager') {
        window.close()
      } else {
        router.replace({ name: 'index' })
      }
    } else {
      message.error('发布失败')
    }
  })
}

const getCategoryAndTagList = async () => {
  let ctList: API.PictureTagCategory = await categoryTagStoreInstance.getCategoryTagList()

  categoryTagList.categoryList = ctList.categoryList?.map((item) => {
    return {
      label: item,
      value: item,
    }
  })

  categoryTagList.tagList = ctList.tagList?.map((item) => {
    return {
      label: item,
      value: item,
    }
  })
}

const getOldPictureInfo = () => {
  const id = route.query?.id
  if (id === undefined) return
  if (route.query?.from === '/admin/picture-manager') {
    getPictureAdminUsingGet({ id }).then((res: API.BaseResponsePictureVO_) => {
      if (res.code === 0) {
        Object.assign(picture, res.data)
      } else {
        messageApi.error(res.message)
      }
    })
  } else {
    getPictureUsingGet({ id }).then((res: API.BaseResponsePictureVO_) => {
      if (res.code === 0) {
        Object.assign(picture, res.data)
      } else {
        messageApi.error(res.message)
      }
    })
  }
}

const doUrlUpload = () => {
  picture.url = uploadUrl.value
  uploadPictureUrlUsingPost(picture).then((res: API.BaseResponsePictureVO_) => {
    if (res.code === 0) {
      Object.assign(picture, res.data)
    }
  })
}

onMounted(() => {
  getCategoryAndTagList()
  getOldPictureInfo()
})
</script>

<template>
  <div id="AddPicturePage">
    <context-holder />
    <h2 style="margin: 20px 0">
      {{ route.query?.id ? '修改图片' : '添加图片' }}
    </h2>

    <a-tabs v-model:activeKey="uploadMethodKey">
      <a-tab-pane key="file" tab="文件上传">
        <PictureUpload :picture="picture" @send-picture-info="getPictureInfo" />
      </a-tab-pane>
      <a-tab-pane key="1" tab="URL上传">
        <a-input-group compact>
          <a-input
            v-model:value="uploadUrl"
            style="width: calc(100% - 75px)"
            placeholder="请输入图片 URL 地址"
          />
          <a-button type="primary" @click="doUrlUpload">上传</a-button>
        </a-input-group>
      </a-tab-pane>
    </a-tabs>

    <a-form v-if="picture?.url" :model="picture" layout="vertical">
      <a-form-item label="图片名称">
        <a-input v-model:value="picture.name" placeholder="请输入图片名称" allow-clear />
      </a-form-item>
      <a-form-item label="简介">
        <a-textarea
          v-model:value="picture.introduction"
          placeholder="请输入简介"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
        />
      </a-form-item>
      <a-form-item name="select" label="分类" has-feedback>
        <a-auto-complete
          :options="categoryTagList.categoryList"
          v-model:value="picture.category"
          placeholder="请选择分类"
        />
      </a-form-item>
      <a-form-item name="select-multiple" label="标签">
        <a-select
          v-model:value="picture.tags"
          mode="tags"
          placeholder="请选择标签"
          :options="categoryTagList.tagList"
          allow-clear
        ></a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 100%" @click="onFinish">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
#AddPicturePage {
  max-width: 720px;
  margin: 0 auto;
}
</style>
