<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab
        v-for="channel in userChannels"
        :title="channel.name"
        :key="channel.id"
      >
      <!-- 自定义组件 -->
      <article-list :channel="channel" />
          <!-- TODO: 文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
// 引入用户频道列表
import { getUserChannels } from '@/api/channel'

import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      userChannels: [] // 用户频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取用户频道列表
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels  () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
      // console.log(this.userChannels)
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}

.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
</style>
