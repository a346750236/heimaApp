<template>
  <div class="login">
    <!-- 导航条 -->
    <van-nav-bar title="登录" />
    <!-- 登录组件-表单 -->
      <!--
      表单验证
      1、使用 ValidationObserver 组件把需要验证的整个表单包起来
      2、使用 ValidationProvider 组件把具体的表单元素包起来，例如 input
         name   配置字段的提示名称
         rules  配置校验规则
         v-slot="{ errors }" 获取校验失败的错误提示消息
     -->
    <ValidationObserver ref="Myform">
      <!-- immediate是自动获取焦点校验 -->
    <ValidationProvider name="手机号" rules="required|mobile" immediate >
      <van-field v-model="user.mobile" placeholder="请输入手机号" left-icon="contact">
        <!-- 图标 -->
        <!-- <i class="icon icon-shouji" slot="left-icon"></i> -->
        <i class="icon icon-lbj" slot="left-icon"></i>
      </van-field>
      </ValidationProvider>
     <ValidationProvider name="验证码" rules="required|code" immediate>
      <van-field v-model="user.code"  placeholder="请输入验证码" left-icon="contact">
        <!-- 图标  -->
        <i class="icon icon-mima" slot="left-icon"></i>
        <!-- 倒计时 -->
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountDownShow = false"
        />
        <!-- 验证码按钮 -->
        <van-button
          v-else
          round
          type="primary"
          size="small"
          slot="button"
          @click="onSendSmsCode"
        >发送验证码</van-button>
      </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click="Onclick">登录</van-button>
    </div>
  </div>
</template>

<script>
// login 登录请求 getSmsCode 手机验证
import { login, getSmsCode } from '@/api/user.js'
import { validate } from 'vee-validate'
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
      },
      isCountDownShow: false // 默认为关闭
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
      const success = await this.$refs.Myform.validate()
      // 判断错误提示
      if (!success) {
        // 表单错误处理
        const errors = this.$refs.Myform.errors
        // 获取错误信息遍历
        // 因为遍历出来的是数组
        // 拿到数组的第一项
        for (let key in errors) {
          const item = errors[key]
          // console.log(item)
          if (item[0]) {
            this.$toast(item[0])
            //  找到第一个错误的消息,给出指示，停止遍历
            return
          }
        }
        return
      }
      // 正确直接执行下一步
      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '等待中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 提示对象.clear()
      // 3. 请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        console.log(data)
        // 登录操作
        this.$router.push('/')
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或者验证码错误')
      }

      // 4. 根据后端返回结果执行后续业务处理
    },
    //   点击发送验证码
    async onSendSmsCode () {
      const { mobile } = this.user
      // 1. 验证手机号是否有效
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 2. 请求发送短信验证码
      try {
        // 解构赋值出来
        const { mobile } = this.user
        await getSmsCode(mobile)
        // 开启倒计时
        this.isCountDownShow = true
      } catch (error) {
        console.log('错误信息', error)
        this.$toast('请勿频繁操作')
      }
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
