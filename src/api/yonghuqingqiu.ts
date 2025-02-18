// @ts-ignore
/* eslint-disable */
import request from '@/plugins/myAxios'

/** 创建用户-管理员 POST /api/user/admin/add-user */
export async function addUserUsingPost(body: API.Dto, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/user/admin/add-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据id删除用户-管理员 GET /api/user/admin/delete-user */
export async function deleteUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/user/admin/delete-user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 根据id获取用户-管理员 GET /api/user/admin/get-user */
export async function getUserByIdAdminUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdAdminUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVoAdmin_>('/api/user/admin/get-user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页获取用户-管理员 GET /api/user/admin/page-user */
export async function pageUserAdminUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUserAdminUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageVOUserVoAdmin_>('/api/user/admin/page-user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 根据id更新用户-管理员 POST /api/user/admin/update-user */
export async function updateUserUsingPost(
  body: API.adminUpdateUserDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/user/admin/update-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取当前登录用户信息 GET /api/user/current */
export async function getCurrentUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 根据id获取用户 GET /api/user/get-user */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVo_>('/api/user/get-user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 用户登录 POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequestDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户退出 POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 用户注册 POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequestDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
