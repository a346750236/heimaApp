<template>
  <div class="user-profile">
    <!-- $router.back()   路由后退 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像">
        <van-image
         round
         class="avater"
         src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-cell>
      <van-cell is-link title="昵称" value="内容"></van-cell>
      <van-cell is-link title="介绍" value="内容"></van-cell>
      <van-cell is-link title="性别" value="内容"></van-cell>
      <van-cell is-link title="生日" value="内容"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
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
