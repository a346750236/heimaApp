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
