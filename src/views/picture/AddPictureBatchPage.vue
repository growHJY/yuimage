<script setup lang="ts">
import { message } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { uploadPictureUrlBatchUsingPost } from '@/api/tupianjiekou.ts'

const batchPictureRequest: API.uploadPictureUrlBatchUsingPOSTParams = reactive({
  kw: '',
  namePrefix: '',
  quantity: 1,
})


let isLoading = ref(false)

const [messageApi, contextHolder] = message.useMessage()

const doStartTask = async () => {
  isLoading.value = true
  let res: API.BaseResponseInt_ = await uploadPictureUrlBatchUsingPost(batchPictureRequest)
  if (res.code === 0) {
    messageApi.success(`成功抓取${res.data}张图片`)
  } else {
    messageApi.error(res.message)
  }
  isLoading.value = false
}
</script>

<template>
  <div id="AddPictureBatchPage">
    <context-holder />
    <h2 style="margin: 20px 0">批量抓取图片</h2>

    <a-form :model="batchPictureRequest" layout="vertical">
      <a-form-item label="关键词">
        <a-input
          v-model:value="batchPictureRequest.kw"
          placeholder="请输入抓取关键词"
          allow-clear
        />
      </a-form-item>
      <a-flex gap="large" class="a-flex" align="space-between">
        <a-form-item label="前缀" class="flex-left">
          <a-input
            v-model:value="batchPictureRequest.namePrefix"
            placeholder="请输入图片前缀"
            allow-clear
          />
        </a-form-item>
        <a-form-item name="select" label="最大数量" has-feedback>
          <a-input-number v-model:value="batchPictureRequest.quantity" :min="1" :max="30" />
        </a-form-item>
      </a-flex>

      <a-form-item>
        <a-button type="primary" style="width: 100%" @click="doStartTask" :loading="isLoading">
          执行任务
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
#AddPictureBatchPage {
  max-width: 720px;
  margin: 0 auto;

  .a-flex {
    :deep(.ant-form-item) {
      flex: 1;
    }

    .flex-left {
      flex: 2 !important;
    }

    :deep(.ant-input-number-affix-wrapper) {
      width: 100%;
      flex: 1;
    }
  }
}
</style>
