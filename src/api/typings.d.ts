declare namespace API {
  type adminUpdateUserDto = {
    /** 用户id */
    id: number
    /** 是否删除 */
    isDelete?: number
    /** 更新时间 */
    updateTime?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户昵称 */
    userName?: string
    /** 密码 */
    userPassword?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
  }

  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseInt_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponsePageVOPictureVO_ = {
    code?: number
    data?: PageVOPictureVO_
    message?: string
  }

  type BaseResponsePageVOUserVoAdmin_ = {
    code?: number
    data?: PageVOUserVoAdmin_
    message?: string
  }

  type BaseResponsePictureTagCategory_ = {
    code?: number
    data?: PictureTagCategory
    message?: string
  }

  type BaseResponsePictureVO_ = {
    code?: number
    data?: PictureVO
    message?: string
  }

  type BaseResponseUserVo_ = {
    code?: number
    data?: UserVo
    message?: string
  }

  type BaseResponseUserVoAdmin_ = {
    code?: number
    data?: UserVoAdmin
    message?: string
  }

  type deletePictureUsingPOSTParams = {
    /** 删除的图片id */
    id: number
  }

  type deleteUserUsingGETParams = {
    /** id */
    id: number
  }

  type Dto = {
    /** 账号 */
    userAccount: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户昵称 */
    userName?: string
    /** 密码 */
    userPassword?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
  }

  type getPictureAdminUsingGETParams = {
    /** id */
    id: number
  }

  type getPicturePageAdminUsingGETParams = {
    /** 页码 */
    pageNum: number
    /** 条数 */
    pageSize: number
  }

  type getPicturePageUsingGETParams = {
    /** 页码 */
    pageNum: number
    /** 条数 */
    pageSize: number
  }

  type getPictureUsingGETParams = {
    /** 图片id */
    id: number
  }

  type getUserByIdAdminUsingGETParams = {
    /** id */
    id: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id: number
  }

  type LoginUserVO = {
    createTime?: string
    editTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type pageUserAdminUsingGETParams = {
    /** 页码 */
    pageNum: number
    /** 每页显示条数 */
    pageSize: number
  }

  type PageVOPictureVO_ = {
    current?: number
    records?: PictureVO[]
    size?: number
    total?: number
  }

  type PageVOUserVoAdmin_ = {
    current?: number
    records?: UserVoAdmin[]
    size?: number
    total?: number
  }

  type PictureReviewRequest = {
    /** 审核图片的id */
    id?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 审核状态 */
    reviewStatus?: number
  }

  type PictureTagCategory = {
    /** 分类列表 */
    categoryList?: string[]
    /** 标签列表 */
    tagList?: string[]
  }

  type PictureUpdateRequest = {
    /** 分类 */
    category?: string
    /** id */
    id: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 标签（JSON 数组） */
    tags?: string[]
  }

  type PictureVO = {
    /** 分类 */
    category?: string
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** id */
    id?: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 图片格式 */
    picFormat?: string
    /** 图片高度 */
    picHeight?: number
    /** 图片比例 */
    picScale?: number
    /** 文件体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 审核状态：0-待审核; 1-通过; 2-拒绝 */
    reviewStatus?: number
    /** 审核时间 */
    reviewTime?: string
    /** 审核人 ID */
    reviewerId?: number
    /** 标签 */
    tags?: string[]
    /** 更新时间 */
    updateTime?: string
    /** 图片 url */
    url?: string
    user?: UserVoAdmin
    /** 用户 id */
    userId?: number
  }

  type searchPictureUsingGETParams = {
    /** 关键字 */
    keyword?: string
    /** 页码 */
    pageNum: number
    /** 条数 */
    pageSize: number
    /** 标签 */
    tags?: string[]
  }

  type uploadPictureUrlBatchUsingPOSTParams = {
    /** 图片搜索关键字 */
    kw?: string
    /** 名字前缀 */
    namePrefix: string
    /** 爬取数量 */
    quantity?: number
  }

  type uploadPictureUrlUsingPOSTParams = {
    /** 图片 id（用于修改） */
    id: number
    /** 图片url */
    url: string
  }

  type uploadPictureUsingPOSTParams = {
    /** 图片 id（用于修改） */
    id: number
    /** 图片url */
    url: string
  }

  type UserLoginRequestDto = {
    /** 用户账号 */
    userAccount: string
    /** 用户密码 */
    userPassword: string
  }

  type UserRegisterRequestDto = {
    /** 确认密码 */
    checkPassword: string
    /** 用户账号 */
    userAccount: string
    /** 用户密码 */
    userPassword: string
  }

  type UserVo = {
    /** 创建时间 */
    createTime?: string
    /** 用户id */
    id?: number
    /** 用户账号 */
    userAccount?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户昵称 */
    userName?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole?: string
  }

  type UserVoAdmin = {
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** 用户id */
    id?: number
    /** 是否删除 */
    isDelete?: number
    /** 更新时间 */
    updateTime?: string
    /** 用户账号 */
    userAccount?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户昵称 */
    userName?: string
    /** 用户密码 */
    userPassword?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：user/admin */
    userRole?: string
  }
}
