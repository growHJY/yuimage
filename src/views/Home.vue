<script setup lang="ts">
import { getPicturePageUsingGet, searchPictureUsingGet } from '@/api/tupianjiekou.ts'
import { onMounted, reactive, ref, watch } from 'vue'
import { pictureManagerPageStore } from '@/stores/pictureManagerPageStore.ts'
import { categoryTagStore } from '@/stores/categoryTagStore.ts'
import { useRouter } from 'vue-router'

let searchText = ref('')
let pageSetting = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
let categoryList = ref<string[]>([])
let tagList = ref<string[]>([])
const selectTagsFlag = reactive([])

const router = useRouter()
const categoryTagStoreInstance = categoryTagStore()
const activeKey = ref('all')
const pictureManagerPageStoreInstance = pictureManagerPageStore()
const fetchDate = (pageNum: number, pageSize: number) => {
  getPicturePageUsingGet({
    pageNum,
    pageSize,
  }).then((res: API.BaseResponsePageVOPictureVO_) => {
    if (res.code === 0) {
      pageSetting.total = Number(res.data.total)
      pageSetting.pageSize = Number(res.data.size)
      pageSetting.pageNum = Number(res.data.current)
      pictureManagerPageStoreInstance.setConstantPictureList(res.data.records)
    }
  })
}

const onSearch = () => {
  fetchSearch(1, pageSetting.pageSize)
}

const changePage = (current, size) => {
  if (searchText.value) {
    fetchSearch(current, size)
    return
  }
  fetchDate(current, size)
}

const fetchSearch = (pageNum, pageSize) => {
  searchPictureUsingGet({
    pageNum,
    pageSize,
    keyword: searchText.value,
    tags: selectTags.value.join(','),
  }).then((res: API.BaseResponsePageVOPictureVO_) => {
    if (res.code === 0) {
      pageSetting.pageNum = Number(res.data?.current)
      pageSetting.pageSize = Number(res.data?.size)
      pageSetting.total = Number(res.data.total)
      pictureManagerPageStoreInstance.setConstantPictureList(res.data.records)
    }
  })
}

const changeSize = (current, size) => {
  fetchDate(current, size)
}

let selectTags = ref([])

watch(selectTags.value, (val) => {
  pageSetting.pageNum = 1
  fetchSearch(pageSetting.pageNum, pageSetting.pageSize)
})

const handleChange = (tag: string, checked: boolean) => {
  if (checked) {
    for (let i = 0; i < selectTagsFlag.length; i++) {
      if (selectTagsFlag[i] && !selectTags.value.includes(tag)) {
        selectTags.value.push(tag)
      }
    }
  } else {
    for (let i = 0; i < selectTags.value.length; i++) {
      if (selectTags.value[i] === tag) {
        selectTags.value.splice(i, 1)
      }
    }
  }
}

const tabChange = () => {
  pageSetting.pageNum = 1
  if (activeKey.value === 'all') {
    searchText.value = ''
    fetchDate(pageSetting.pageNum, pageSetting.pageSize)
  } else {
    searchText.value = activeKey.value
    fetchSearch(pageSetting.pageNum, pageSetting.pageSize)
  }
}

const toDetail = (item: API.PictureVO) => {
  router.push({
    path: `/picture/detail/${item.id}`,
  })
}

onMounted(async () => {
  fetchDate(pageSetting.pageNum, pageSetting.pageSize)
  const ctList: API.PictureTagCategory = await categoryTagStoreInstance.getCategoryTagList()
  categoryList.value = ctList.categoryList
  tagList.value = ctList.tagList
})
</script>

<template>
  <div id="home">
    <a-watermark content="Design By HJY">
      <div class="searchBox">
        <a-input-search
          v-model:value="searchText"
          placeholder="在海量图片中搜索你想看的"
          enter-button
          @search="onSearch"
          allowClear
        />
      </div>

      <div class="categoryTagBox">
        <a-tabs v-model:activeKey="activeKey" @change="tabChange">
          <a-tab-pane key="all" tab="全部" />
          <a-tab-pane v-for="category in categoryList" :key="category" :tab="category" />
        </a-tabs>
        <a-space>
          标签:
          <a-checkable-tag
            v-for="(tag, index) in tagList"
            :key="index"
            v-model:checked="selectTagsFlag[index]"
            @change="(checked) => handleChange(tag, checked)"
          >
            {{ tag }}
          </a-checkable-tag>
        </a-space>
      </div>

      <a-list
        :grid="{ gutter: 6, xs: 2, sm: 2, md: 4, lg: 4, xl: 5, xxl: 6 }"
        :data-source="pictureManagerPageStoreInstance.getPictureList()"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card
              @click="toDetail(item)"
              hoverable
              style="height: 420px; width: 230px; padding: 1px"
              :title="item.name"
            >
              <template #cover>
                <img
                  height="250px"
                  style="border-radius: 5px; object-fit: cover"
                  :alt="item.name"
                  :src="item.url"
                />
              </template>
              <a-card-meta
                :title="item.user.userName"
                :description="item.introduction ? item.introduction : '没有写任何描述...'"
              >
                <template #avatar>
                  <a-avatar :src="item.user.userAvatar" />
                </template>
              </a-card-meta>
              <!--              <a-divider />-->
              <!--              <div class="tagBox" style="width: 100%; padding: 10px 0; overflow: hidden">-->
              <!--                <a-space direction="vertical">-->
              <!--                  <a-tag>{{ item.category ?? '无分类' }}</a-tag>-->
              <!--                  <a-space :size="6" v-if="item.tags">-->
              <!--                    <a-tag color="blue" v-for="tag in item.tags">{{ tag }}</a-tag>-->
              <!--                  </a-space>-->
              <!--                </a-space>-->
              <!--              </div>-->
            </a-card>
          </a-list-item>
        </template>
      </a-list>

      <div class="pagination">
        <a-pagination
          @change="changePage"
          @show-size-change="changeSize"
          :current="pageSetting.pageNum"
          :total="pageSetting.total"
          show-size-changer
        />
      </div>
    </a-watermark>
  </div>
</template>

<style scoped lang="less">
#home {
  .searchBox {
    margin: 0 auto 20px;
    max-width: 780px;
  }

  .categoryTagBox {
    margin-bottom: 20px;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  :deep(.ant-card-meta-description) {
    font-size: 12px;
    overflow: hidden; /* 隐藏超出容器的文本 */
    white-space: nowrap; /* 保持文本在一行内显示 */
    text-overflow: ellipsis; /* 使用省略号表示文本溢出 */
  }
}
</style>
