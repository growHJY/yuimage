import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { listPictureTagCategoryUsingGet } from '@/api/tupianjiekou.ts'

export const categoryTagStore = defineStore('categoryTagStore', () => {
  let categoryTagList = reactive<API.PictureTagCategory>({})

  function getCategoryTagList() {
    return new Promise((resolve, reject) => {
      // 检查 categoryTagList 是否为空
      if (Object.keys(categoryTagList).length === 0) {
        // 如果为空，则远程获取数据
        listPictureTagCategoryUsingGet().then((res) => {
          if (res.code === 0) {
            console.log("远程获取成功");
            categoryTagList = res.data; // 更新 categoryTagList
            resolve(categoryTagList); // 成功时返回数据
          } else {
            console.error("远程获取失败：", res.message);
            reject(new Error(res.message)); // 失败时抛出错误
          }
        }).catch((error) => {
          console.error("网络请求失败：", error);
          reject(error); // 捕获网络请求错误
        });
      } else {
        // 如果 categoryTagList 不为空，直接返回当前数据
        console.log("使用本地缓存数据");
        resolve(categoryTagList);
      }
    });
  }

  return { getCategoryTagList }
})
