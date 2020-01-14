<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航栏 -->

    <!-- 频道列表 -->

    <van-tabs v-model="active">
       <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
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

    <!-- 弹出层 -->
    <van-popup
    v-model="isChannelEditShow"
    position="bottom"
    closeable
    close-icon-position="top-left"
    :style="{height:'100%'}"
    >
    <!-- 编辑组件 -->
     <channel-edit
        :user-channels="userChannels"
        :active="active"
        @switch="onChannelSwitch"
      />
    </van-popup>
  </div>
</template>

<script>
// 引入用户频道列表
import { getUserChannels } from '@/api/channel'

import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制标签页的激活项
      userChannels: [], // 用户频道列表
      isChannelEditShow: false // 控制弹层
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
    // 获取用户频道列表

    async loadUserChannels () {
      try {
        // 1. 声明变量存储频道数据
        let channels = []
        // 2. 获取本地存储的频道列表
        const localUserChannels = getItem('user-channels')
        // 3. 如果有本地存储的则使用本地存储逇
        if (localUserChannels) {
          channels = localUserChannels
        } else {
          // 4. 如果没有本地存储的，则使用接口的
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
        // 5. 将数据赋值给当前组件数据
        this.userChannels = channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    },
    onChannelSwitch (index) {
      this.active = index // 切换激活频道
      this.isChannelEditShow = false // 关闭弹层
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

.wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
}
</style>
