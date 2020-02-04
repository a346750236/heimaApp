<template>
  <div class="user-profile">
    <!-- $router.back()   路由后退 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像">
        <van-image
         round
         class="avater"
         :src="user.photo"
         />
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name"></van-cell>
      <van-cell is-link title="介绍" value="内容"></van-cell>
      <van-cell is-link title="性别" :value="user.gender ===0 ? '男' : ' 女'"></van-cell>
      <van-cell is-link title="生日" :value="user.birthday"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { GetuserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {} // 用户信息
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      try {
        let { data } = await GetuserProfile()
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile{
    .avater{
        width: 30px;
        height: 30px;
    }
}
</style>
