// @ts-ignore
/* eslint-disable */
import request from '@/plugins/myAxios'

/** 删除图片 POST /api/picture/delete */
export async function deletePictureUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePictureUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取图片信息 GET /api/picture/get-picture */
export async function getPictureUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVO_>('/api/picture/get-picture', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取图片信息-管理员 GET /api/picture/get-picture-admin */
export async function getPictureAdminUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureAdminUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVO_>('/api/picture/get-picture-admin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取图片分页信息 GET /api/picture/get-picture-page */
export async function getPicturePageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPicturePageUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageVOPictureVO_>('/api/picture/get-picture-page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取图片分页信息-管理员 GET /api/picture/get-picture-page-admin */
export async function getPicturePageAdminUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPicturePageAdminUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageVOPictureVO_>('/api/picture/get-picture-page-admin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 图片审核 POST /api/picture/picture-review */
export async function doPictureReviewUsingPost(
  body: API.PictureReviewRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/picture-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 搜索图片 GET /api/picture/search */
export async function searchPictureUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchPictureUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageVOPictureVO_>('/api/picture/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取图片分类和标签 GET /api/picture/tag_category */
export async function listPictureTagCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponsePictureTagCategory_>('/api/picture/tag_category', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新图片信息 POST /api/picture/update */
export async function updatePictureUsingPost(
  body: API.PictureUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 上传图片 POST /api/picture/upload */
export async function uploadPictureUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUsingPOSTParams,
  body: {
    /** 需要上传的图片 */
    file: any
  },
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.BaseResponsePictureVO_>('/api/picture/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}

/** 批量上传图片-url POST /api/picture/upload-batch-url */
export async function uploadPictureUrlBatchUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUrlBatchUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>('/api/picture/upload-batch-url', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 上传图片-url POST /api/picture/upload-url */
export async function uploadPictureUrlUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUrlUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVO_>('/api/picture/upload-url', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
