<script lang="ts" setup>
import { FrownOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { message, notification, type TableProps } from 'ant-design-vue'
import { computed, h, nextTick, onMounted, reactive, ref, type UnwrapRef, watch } from 'vue'
import { doPictureReviewUsingPost, getPicturePageAdminUsingGet } from '@/api/tupianjiekou.ts'
import { pictureManagerPageStore } from '@/stores/pictureManagerPageStore.ts'
import { filterTime, formatFileSize } from '@/utils/index.ts'
import { useRouter } from 'vue-router'

const [messageApi, contextHolder] = message.useMessage()

let tableLoading = ref(true)
let pageSetting = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

const pictureManagerPageStoreInstance = pictureManagerPageStore()
const searchInput = ref('')
const modalOpen = ref<boolean>(false)
const router = useRouter()

enum PictureReviewStatusEnum {
  REVIEWING = 0,
  REVIEW_PASSED = 1,
  REVIEW_FAILED = 2,
}

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 80,
    customRender: ({ text, record, index }) => {
      return `${index + 1}`
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 180,
  },
  {
    title: '图片地址',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '审核信息',
    dataIndex: 'reviewStatus',
    key: 'reviewStatus',
    ellipsis: true,
    width: 180,
    filters: [
      {
        text: '待审核',
        value: PictureReviewStatusEnum.REVIEWING,
      },
      {
        text: '已审核',
        value: PictureReviewStatusEnum.REVIEW_PASSED,
      },
      {
        text: '已拒绝',
        value: PictureReviewStatusEnum.REVIEW_FAILED,
      },
    ],
    onFilter: (value: string, record: TableDataType) => {
      if (record.reviewStatus === value) {
        return record
      }
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    customFilterDropdown: true,
    ellipsis: true,
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    key: 'introduction',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
  },

  {
    title: '信息',
    key: 'info',
    width: 150,
  },
  {
    title: '用户id',
    key: 'userId',
    dataIndex: 'userId',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '编辑',
    key: 'operation',
    fixed: 'right',
  },
]

const pagination = computed(() => ({
  total: pageSetting.total,
  current: pageSetting.pageNum,
  pageSize: pageSetting.pageSize,
  showSizeChanger: true,
}))

// 分页请求
const handleTableChange: TableProps['onChange'] = (pag: { pageSize: number; current: number }) => {
  console.log(pag)
  pageSetting.pageNum = pag.current
  pageSetting.pageSize = pag.pageSize
  pageSetting.total = pag.total
  tableLoading.value = true

  getPicturePageAdminUsingGet({
    pageNum: pageSetting.pageNum,
    pageSize: pageSetting.pageSize,
  }).then((res: API.BaseResponsePageVOPictureVO_) => {
    if (res.code === 0) {
      pictureManagerPageStoreInstance.setConstantPictureList(res.data.records)
      pageSetting.total = Number(res.data.total)
      nextTick(() => {
        tableLoading.value = false
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

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  const kw = selectedKeys[0]
  let filterUserList = []
  if (kw == undefined || kw.trim().length === 0) {
    notification.open({
      message: '找不到相关数据',
      duration: 1,
      icon: () => h(FrownOutlined, { style: 'color: red' }),
    })
    return
  }

  if (dataIndex === 'name') {
    filterUserList = pictureManagerPageStoreInstance
      .getPictureList()
      .filter((item: API.PictureVO) => {
        const name = item.name ?? null
        if (name?.includes(kw)) {
          return true
        }
      })
  } else if (dataIndex === 'userAccount') {
    filterUserList = pictureManagerPageStoreInstance
      .getPictureList()
      .filter((item: API.PictureVO) => {
        const userAccount = item.userAccount ?? null
        if (userAccount?.includes(kw)) {
          return true
        }
      })
  }
  console.log(filterUserList)
  pictureManagerPageStoreInstance.setPictureList(filterUserList)
}

const handleReset = (clearFilters) => {
  clearFilters({ confirm: true })
  pictureManagerPageStoreInstance.setPictureList([])
}

onMounted(() => {
  getPicturePageAdminUsingGet({
    pageNum: pageSetting.pageNum,
    pageSize: pageSetting.pageSize,
  }).then((res: API.BaseResponse_) => {
    if (res.code === 0) {
      pictureManagerPageStoreInstance.setConstantPictureList(res.data.records)
      pageSetting.total = Number(res.data.total)
      nextTick(() => {
        tableLoading.value = false
      })
    } else {
      notification.open({
        message: res.message,
        duration: 1,
        icon: () => h(FrownOutlined, { style: 'color: red' }),
      })
    }
  })
})

const tempPictureReviewRequest: API.PictureReviewRequest = reactive({})

const doReview = (id: string, val: number) => {
  tempPictureReviewRequest.id = id
  tempPictureReviewRequest.reviewStatus = val
  modalOpen.value = true
}

const handleOk = () => {
  doPictureReviewUsingPost(tempPictureReviewRequest).then((res: API.BaseResponseBoolean_) => {
    if (res.code === 0) {
      pictureManagerPageStoreInstance.getPictureList().filter((item: API.PictureVO) => {
        if (item.id === tempPictureReviewRequest.id) {
          item.reviewStatus = tempPictureReviewRequest.reviewStatus
        }
      })
      messageApi.success('审核成功')
    } else {
      messageApi.error('审核失败')
    }
  })
  modalOpen.value = false
}
const toBatchPage = () => {
  router.push({
    name: "pictureBatchAdd"
  })
}

</script>

<template>
  <div id="pictureManagerPage">
    <div class="operation-box" style="margin: 16px 0">
      <a-flex justify="flex-end">
        <a-button type="primary" ghost @click="toBatchPage">批量上传图片</a-button>
      </a-flex>
    </div>
    <context-holder />
    <a-modal v-model:open="modalOpen" title="图片审核" @ok="handleOk">
      <a-textarea
        v-model:value="tempPictureReviewRequest.reviewMessage"
        placeholder="请输入同意/拒绝的理由"
        allow-clear
      />
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="pictureManagerPageStoreInstance.getPictureList()"
      :scroll="{ x: 1500, y: 800 }"
      :pagination="pagination"
      @change="handleTableChange"
      :loading="tableLoading"
    >
      <template
        #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            placeholder="搜索用户名"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined />
            </template>
            搜索
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            重置
          </a-button>
        </div>
      </template>

      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'id'">
          {{ record.id }}
        </template>
        <template v-else-if="column.key === 'url'">
          <a-image style="max-height: 150px" :src="record.url" />
        </template>
        <template v-else-if="column.key === 'reviewStatus'">
          <a-space direction="vertical" :wrap="false">
            <div>
              <a-tag v-if="record.reviewStatus === PictureReviewStatusEnum.REVIEWING" color="blue">
                审核中
              </a-tag>
              <a-tag
                v-else-if="record.reviewStatus === PictureReviewStatusEnum.REVIEW_PASSED"
                color="green"
              >
                审核通过
              </a-tag>
              <a-tag
                v-else-if="record.reviewStatus === PictureReviewStatusEnum.REVIEW_FAILED"
                color="red"
              >
                审核拒绝
              </a-tag>
            </div>
            <div v-if="record.reviewStatus != PictureReviewStatusEnum.REVIEWING">
              审核人ID:
              <div>{{ record.reviewerId }}</div>
            </div>
          </a-space>
        </template>
        <template v-if="column.key === 'tags'">
          <a-space wrap :size="[2, 4]">
            <a-tag v-for="item in record.tags ?? []">{{ item }}</a-tag>
          </a-space>
        </template>
        <template v-if="column.key === 'createTime'">
          {{ filterTime(record.createTime) }}
        </template>
        <template v-if="column.key === 'info'">
          <a-space direction="vertical">
            <div style="font-size: 13px">图片大小: {{ formatFileSize(record.picSize) }}</div>
            <div style="font-size: 13px">图片宽度: {{ record.picWidth }}</div>
            <div style="font-size: 13px">图片高度: {{ record.picHeight }}</div>
            <div style="font-size: 13px">图片缩放: {{ record.picScale }}</div>
            <div style="font-size: 13px">图片格式: {{ record.picFormat }}</div>
          </a-space>
        </template>

        <template v-if="column.key === 'operation'">
          <a-space wrap direction="vertical">
            <a-button
              type="link"
              size="small"
              :href="`/picture/add?id=${record.id}&from=/admin/picture-manager`"
              target="_blank"
            >
              编辑
            </a-button>

            <a-button
              v-if="
                record.reviewStatus === PictureReviewStatusEnum.REVIEWING ||
                record.reviewStatus === PictureReviewStatusEnum.REVIEW_FAILED
              "
              @click="doReview(record.id, PictureReviewStatusEnum.REVIEW_PASSED)"
              type="link"
              size="small"
              target="_blank"
              color="green"
            >
              通过
            </a-button>

            <a-button
              v-if="
                record.reviewStatus === PictureReviewStatusEnum.REVIEWING ||
                record.reviewStatus === PictureReviewStatusEnum.REVIEW_PASSED
              "
              @click="doReview(record.id, PictureReviewStatusEnum.REVIEW_FAILED)"
              type="link"
              size="small"
              target="_blank"
              danger
            >
              拒绝
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style lang="less" scoped>
#pictureManagerPage {
  height: 100%;

  :deep(.ant-table-body) {
    height: 550px;
  }
}
</style>
