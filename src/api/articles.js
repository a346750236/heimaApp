// 用户相关的请求模块
import request from '@/utils/request.js'

// 获取指定用户的文章列表信息
export const getArticlesByUser = (userId, params) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}
