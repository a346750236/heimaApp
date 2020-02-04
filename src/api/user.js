// 用户相关的请求模块
import request from '@/utils/request.js'

// 用户登录
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 手机验证
export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// 获取当前用户登录信息
export const getUserInfor = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取指定用户信息

export const getUserById = userId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`
  })
}

/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户资料
 */
export const GetuserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

/**
 * 获取用户头像
 */
// 更新用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    // 注意：
    // 如果 Content-Type 要求是 application/json，则传递 {}
    // 如果 Content-Type 要求是 multipart/form-data，则传递 FormData 对象
    // multipart/form-data 常见于文件上传的格式要求
    data
  })
}
