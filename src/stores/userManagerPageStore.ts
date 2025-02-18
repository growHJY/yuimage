import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const userManagerPageStore = defineStore('userManagerPageStore', () => {
  let constantUserList = reactive<API.UserVoAdmin>([])
  let userList = reactive<API.UserVoAdmin>([])

  function setUserList(list: API.UserVoAdmin[]) {
    userList.length = 0 // 清空原数组
    userList.push(...list) // 追加新元素
  }

  function setConstantUserList(list: API.UserVoAdmin[]) {
    constantUserList.length = 0
    constantUserList.push(...list)
  }

  function getUserList() {
    return userList.length > 0 ? userList : constantUserList
  }

  return { userList, setUserList, constantUserList, setConstantUserList, getUserList }
})
