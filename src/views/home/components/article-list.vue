<template>
  <div>
    <!-- list组件用来加载数据的 -->
    <!-- onRefresh 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
       v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
        <van-cell
         v-for="(article,index) in list"
         :key="index" :title="article.title"
         @click="$router.push('/article/' + article.art_id)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 获取频道列表数据
import { getArticles } from '@/api/articles'
export default {
  name: 'ArticleList',
  components: {},
  //   props: ['channel'],
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object, // 必须是对象
      required: true //  必须传递该数据
    }
  },
  data () {
    return {
      list: [], // 列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 数据是否加载完毕
      timestamp: null, // 用于获取下一页数据的时间戳
      isLoading: false // 拉剩下下拉刷新的 loading
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })

      // 2. 把请求获取到的数据添加到数组列表中
      const results = data.data.results
      this.list.push(...results)

      // 3. 加载状态结束
      this.loading = false

      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })

      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)

      // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false

      // 提示更新成功
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}
</script>

<style scoped lang="less">

</style>
