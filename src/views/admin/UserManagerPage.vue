<script lang="ts" setup>
import { FrownOutlined, SearchOutlined, EditOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { pageUserAdminUsingGet, updateUserUsingPost } from '@/api/yonghuqingqiu.ts'
import { notification, type TableProps } from 'ant-design-vue'
import { computed, h, nextTick, onMounted, reactive, ref, type UnwrapRef, watch } from 'vue'
import { userManagerPageStore } from '@/stores/userManagerPageStore.ts'
import { cloneDeep } from 'lodash-es'
import wrapperRaf from 'ant-design-vue/es/_util/raf'
import cancel = wrapperRaf.cancel
import {filterTime} from '@/utils/index.ts'

let tableLoading = ref(true)
let pageSetting = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
let selectRole = ref(null)
let selectIsDelete = ref(null)

const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})
const userManagerPageStoreInstance = userManagerPageStore()
const searchInput = ref('')
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 180,
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    customFilterDropdown: true,
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    key: 'userName',
    customFilterDropdown: true,
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole',
  },
  {
    title: '用户头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
    width: 120,
  },
  {
    title: '个人简介',
    dataIndex: 'userProfile',
    key: 'userProfile',
  },

  {
    title: '注册时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '编辑时间',
    key: 'editTime',
    dataIndex: 'editTime',
    width: 180,
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    width: 180,
  },
  {
    title: '是否删除',
    dataIndex: 'isDelete',
    key: 'isDelete',
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    fixed: 'right',
    width: 130,
  },
]

const pagination = computed(() => ({
  total: pageSetting.total,
  current: pageSetting.pageNum,
  pageSize: pageSetting.pageSize,
  showSizeChanger: true,
}))

// 分页请求
const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  pageSetting.pageNum = pag.current
  pageSetting.pageSize = pag.pageSize
  pageSetting.total = pag.total
  tableLoading.value = true

  pageUserAdminUsingGet({
    pageNum: pageSetting.pageNum,
    pageSize: pageSetting.pageSize,
  }).then((res: API.BaseResponse_) => {
    if (res.code === 0) {
      // userList.value = res.data.records
      userManagerPageStoreInstance.setConstantUserList(res.data.records)
      pageSetting.total = res.data.total
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

  if (dataIndex === 'userName') {
    filterUserList = userManagerPageStoreInstance.getUserList().filter((item: API.UserVoAdmin) => {
      const username = item.userName ?? null
      if (username?.includes(kw)) {
        return true
      }
    })
  } else if (dataIndex === 'userAccount') {
    filterUserList = userManagerPageStoreInstance.getUserList().filter((item: API.UserVoAdmin) => {
      const userAccount = item.userAccount ?? null
      if (userAccount?.includes(kw)) {
        return true
      }
    })
  }

  userManagerPageStoreInstance.setUserList(filterUserList)
}

const edit = (id: string) => {
  editableData[id] = cloneDeep(
    userManagerPageStoreInstance.getUserList().filter((item) => id === String(item.id))[0],
  )
  selectRole.value = editableData[id].userRole
  selectIsDelete.value = editableData[id].isDelete
}

const cancel = (id: string) => {
  delete editableData[id]
}

const save = (id: string) => {
  const currentTime = new Date()

  editableData[id].userRole = selectRole.value
  editableData[id].isDelete = selectIsDelete.value
  currentTime.setHours(currentTime.getHours() - 8)
  editableData[id].updateTime = currentTime
  Object.assign(
    userManagerPageStoreInstance.getUserList().filter((item) => id === String(item.id))[0],
    editableData[id],
  )
  // 修改数据库
  updateUserUsingPost(editableData[id]).then((res: API.BaseResponseLong_) => {
    if (res.code === 0) {
      notification.open({
        message: '修改成功',
        duration: 1,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
      })
    } else {
      notification.open({
        message: '修改成功',
        duration: 1,
        icon: () => h(FrownOutlined, { style: 'color: red' }),
      })
    }
  })
  delete editableData[id]
}

const handleReset = (clearFilters) => {
  clearFilters({ confirm: true })
  userManagerPageStoreInstance.setUserList([])
}

onMounted(() => {
  pageUserAdminUsingGet({
    pageNum: pageSetting.pageNum,
    pageSize: pageSetting.pageSize,
  }).then((res: API.BaseResponse_) => {
    if (res.code === 0) {
      // userList.value = res.data.records
      userManagerPageStoreInstance.setConstantUserList(res.data.records)
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
</script>

<template>
  <div id="userManagerPage">
    <a-table
      :columns="columns"
      :data-source="userManagerPageStoreInstance.getUserList()"
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
        <template v-if="!['operation'].includes(column.dataIndex)">
          <div>
            <a-select
              v-if="editableData[record.id] && column.dataIndex == 'userRole'"
              style="width: 80px"
              v-model:value="selectRole"
            >
              <a-select-option value="admin">管理员</a-select-option>
              <a-select-option value="user">用户</a-select-option>
            </a-select>

            <a-select
              v-if="editableData[record.id] && column.dataIndex == 'isDelete'"
              style="width: 80px"
              v-model:value="selectIsDelete"
            >
              <a-select-option :value="1">删除</a-select-option>
              <a-select-option :value="0">启用</a-select-option>
            </a-select>

            <a-input
              v-if="
                editableData[record.id] &&
                column.dataIndex != 'userAvatar' &&
                column.dataIndex != 'updateTime' &&
                column.dataIndex != 'editTime' &&
                column.dataIndex != 'createTime' &&
                column.dataIndex != 'id' &&
                column.dataIndex != 'isDelete' &&
                column.dataIndex != 'userAccount' &&
                column.dataIndex != 'userRole'
              "
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <!--            <a-upload-->
            <!--              v-if="column.dataIndex == 'userAvatar' && editableData[record.id]"-->
            <!--              v-model:file-list="fileList"-->
            <!--              name="avatar"-->
            <!--              list-type="picture-card"-->
            <!--              class="avatar-uploader"-->
            <!--              :show-upload-list="false"-->
            <!--              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"-->
            <!--              :before-upload="beforeUpload"-->
            <!--              @change="handleChange"-->
            <!--            >-->
            <!--              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />-->
            <!--              <div v-else>-->
            <!--                <loading-outlined v-if="loading"></loading-outlined>-->
            <!--                <plus-outlined v-else></plus-outlined>-->
            <!--                <div class="ant-upload-text">Upload</div>-->
            <!--              </div>-->
            <!--            </a-upload>-->
            <template v-else-if="column.dataIndex === 'userRole' && !editableData[record.id]">
              <template v-if="column.key === 'userRole'">
                <template v-if="record.userRole === 'admin'">
                  <a-tag color="blue">管理员</a-tag>
                </template>
                <template v-else>
                  <a-tag color="green">用户</a-tag>
                </template>
              </template>
            </template>
            <template v-else-if="column.dataIndex === 'isDelete' && !editableData[record.id]">
              <!--              <template v-if="column.key === 'userRole'">-->
              <!--         -->
              <!--              </template>-->
              <template v-if="record.isDelete === 0">
                <a-tag color="blue">未删除</a-tag>
              </template>
              <template v-else>
                <a-tag color="green">已删除</a-tag>
              </template>
            </template>
            <template v-else-if="column.dataIndex === 'userAvatar'">
              <template v-if="column.key === 'userAvatar'">
                <template v-if="record.userAvatar != '' && record.userAvatar != null">
                  <a-image :src="record.userAvatar" />
                </template>
                <template v-else>
                  <a-avatar :size="40">{{ record.userName }}</a-avatar>
                </template>
              </template>
            </template>

            <template v-else>
              <span
                v-if="
                  column.dataIndex === 'createTime' ||
                  column.dataIndex === 'updateTime' ||
                  column.dataIndex === 'editTime'
                "
              >
                {{ filterTime(text) }}
              </span>
              <span v-else>
                <span
                  v-if="
                    !(
                      editableData[record.id] &&
                      (column.dataIndex == 'userRole' || column.dataIndex == 'isDelete')
                    )
                  "
                  >{{ text }}</span
                >
              </span>
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a-button type="link" size="small" @click="save(record.id)" danger>保存</a-button>
              <a-button type="link" size="small" @click="cancel(record.id)">取消</a-button>
            </span>
            <span v-else>
              <a-space :size="35">
                <a-button size="small" @click="edit(record.id)" type="link">
                  <template #icon>
                    <EditOutlined />
                    编辑
                  </template>
                </a-button>
              </a-space>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
