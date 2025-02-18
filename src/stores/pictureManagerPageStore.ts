import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const pictureManagerPageStore = defineStore('pictureManagerPageStore', () => {
  let constantPictureList = reactive<API.PictureVO>([])
  let pictureList = reactive<API.PictureVO>([])

  function setPictureList(list: API.PictureVO[]) {
    pictureList.length = 0 // 清空原数组
    pictureList.push(...list) // 追加新元素
  }

  function setConstantPictureList(list: API.PictureVO[]) {
    constantPictureList.length = 0
    constantPictureList.push(...list)
  }

  function getPictureList() {
    return pictureList.length > 0 ? pictureList : constantPictureList
  }

  return {
    constantPictureList,
    pictureList,
    setPictureList,
    setConstantPictureList,
    getPictureList,
  }
})
