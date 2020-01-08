<template>
  <div class="login">
    <!-- 导航条 -->
    <van-nav-bar title="登录" />
    <!-- 登录组件-表单 -->
    <van-cell-group>
      <van-field v-model="user.mobile" placeholder="请输入手机号" left-icon="contact">
        <!-- 图标 -->
        <i class="icon icon-shouji" slot="left-icon"></i>
      </van-field>
      <van-field v-model="user.code" placeholder="请输入验证码" left-icon="contact">
        <!-- 图标  -->
        <i class="icon icon-mima" slot="left-icon"></i>
        <!-- 验证码按钮 -->
        <van-button round type="primary" size="small" slot="button">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click="Onclick">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      // 定义数据
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async Onclick () {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '等待中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 提示对象.clear()
      // 3. 请求登录
      try {
        const res = await request({
          url: '/app/v1_0/authorizations',
          method: 'POST',
          data: user
        })
        console.log(res)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('失败文案')
      }

      // 4. 根据后端返回结果执行后续业务处理
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-btn-box {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background-color: skyblue;
    }
  }
}
</style>
