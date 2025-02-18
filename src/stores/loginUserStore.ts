import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const loginUserStore = defineStore(
  'loginUserStore',
  () => {
    let loginUser: API.LoginUserVo = reactive({})

    const sessionUser = JSON.parse(sessionStorage.getItem('loginUserStore') || '{}')
    Object.assign(loginUser, sessionUser)

    function setLoginUser(user: API.LoginUserVo) {
      loginUser.id = user.id
      loginUser.userAccount = user.userAccount
      loginUser.userAvatar = user.userAvatar
      loginUser.userName = user.userName
      loginUser.userProfile = user.userProfile
      loginUser.userRole = user.userRole
      loginUser.createTime = user.createTime
      loginUser.editTime = user.editTime
      loginUser.updateTime = user.updateTime

      sessionStorage.setItem('loginUserStore', JSON.stringify(loginUser))
    }

    function clearLoginUser() {
      loginUser.id = null
      loginUser.userAccount = null
      loginUser.userAvatar = null
      loginUser.userName = null
      loginUser.userProfile = null
      loginUser.userRole = null
      loginUser.createTime = null
      loginUser.editTime = null
      loginUser.updateTime = null
      sessionStorage.removeItem('loginUserStore')
    }

    return { loginUser, setLoginUser, clearLoginUser }
  },
  {
    // persist: true,
  },
)
