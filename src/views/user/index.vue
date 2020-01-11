<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar :title="user.name" left-arrow />
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image class="col1" fit="cover" round :src="user.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{user.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{user.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{user.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="default" size="small">编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{user.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{user.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
// getUserById 获取用户信息
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/articles'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {
      user: {}, // 用户信息
      list: [], // 列表数据
      //   List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时
      // ，会触发load事件并将loading设置成true。此时可以发起异步操作并更新数据，数据更新完毕后，
      // 将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。
      loading: false,
      finished: false,
      page: 1 // 默认第一页
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser() // 用户信息
  },
  mounted () {},
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        console.log(data)
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast('获取用户数据失败')
      }
    },
    async onLoad () {
      //  1.请求获取数据
      const { data } = await getArticlesByUser(this.$route.params.userId, {
        page: this.page, // 可选的，默认第一页
        per_page: 10 // 可选的,默认每页显示10条
      })
      //   2.把数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      //   3.加载数据结束
      this.loading = false
      //   4.判断当前是否加载完成
      if (results.length) {
        this.page++ // 更新下一页数据
      } else {
        this.finished = true // 没有数据了，不需要加载更多了
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
