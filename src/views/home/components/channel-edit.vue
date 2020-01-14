<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="isEditShow= !isEditShow">{{ isEditShow ? '完成' : '编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="(channel,index) in userChannels"
        :key="channel.id"
        :text="channel.name"
         @click="onUserChannelClick(index)"
      >
      <van-icon v-show="isEditShow && index !== 0" slot="icon" name="close" />
       </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onChannelAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
// getAllChannels 获取文章列表
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false
    }
  },
  computed: {
    //   剩余频道
    remainingChannels  () {
      // 拿到所有列表
      const { allChannels, userChannels } = this
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        // 如果我的频道中不包含当前被遍历的频道，则要
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {
    // 当 userChannels 发生变化，会调用该函数
    userChannels (newVal) {
      // 同步到本地存储
      setItem('user-channels', newVal)
    }
  },
  created () {
    //   获取所有频道
    this.loadAllChannels()
  },
  mounted () {
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 点击推荐添加到我的频道
    onChannelAdd (channel) {
      // 将点击的频道项添加到我的频道列表中
      this.userChannels.push(channel)

      // 不需要删除，我的频道改变，计算属性 recommendChannels 重新调用求值
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，则删除频道
      if (this.isEditShow) {
        this.userChannels.splice(index, 1)
      } else {
        // 如果是非编辑状态，则切换频道
        this.$emit('switch', index) // 修改激活的标签
        // this.$emit('close') // 关闭弹层
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 40px 0;
}

/deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -14px;
  right: -5px;
  .van-icon-close {
    font-size: 14px;
  }
}
</style>
