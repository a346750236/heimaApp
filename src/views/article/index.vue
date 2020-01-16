<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

   <!-- 文章详情 -->
<div class="detail" v-else-if="article.title">
  <h3 class="title">{{ article.title }}</h3>
  <div class="author-wrap">
    <div class="base-info">
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <div class="text">
        <p class="name">{{ article.aut_name }}</p>
        <p class="time">{{ article.pubdate | relativeTime }}</p>
      </div>
    </div>
    <van-button
     v-if="!user || article.aut_id !== user.id"
     class="follow-btn"
     :type="article.is_followed ? 'default' : 'info'"
     size="small"
      round
      :loading="isFollowLoading"
      @click="onFollow"
      >
      {{ article.is_followed ? '已关注' : '+ 关注' }}
      </van-button>
  </div>
  <div class="markdown-body" v-html="article.content"></div>
      <!-- 文章评论 -->
     <article-comment :article-id="articleId" />
     <!-- /文章评论 -->
</div>
<!-- /文章详情 -->

   <!-- 加载失败提示 -->
    <div v-else class="error">
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

 <!-- 底部区域 -->
<div class="footer">
  <van-button
    class="write-btn"
    type="default"
    round
    size="small"
  >写评论</van-button>
  <van-icon
    class="comment-icon"
    name="comment-o"
    info="9"
  />
  <van-icon
    color="orange"
    :name="article.is_collected ? 'star' : 'star-o'"
    @click="onCollect"
  />
  <van-icon
    color="#e5645f"
    :name="article.attitude === 1 ?  'good-job' : 'good-job-o'"
    @click="onLike"
  />
  <van-icon class="share-icon" name="share" />
</div>
  <!-- /底部区域 -->
  </div>
</template>

<script>
// 点击文章显示当前ID文章   deleteCollect  // 取消收藏   addCollect // 收藏
// addLike  // 点赞
// deleteLike  // 取消点赞
// addFollow  // 关注
// deleteFollow //取消关注
import { addFollow, deleteFollow } from '@/api/user'
import {
  getArticleById,
  deleteCollect,
  addCollect,
  addLike,
  deleteLike } from '@/api/articles'
  // vuex 模块提供了一些辅助方法，专门用来让我们更方便的获取容器中的数据
  // mapState ：映射获取state的数据
import { mapState } from 'vuex'
import ArticleComment from './components/article-comment'
export default {
  name: 'ArticlePage',
  components: {
    ArticleComment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 文章加载loading状态
      isFollowLoading: false // 关注按钮的loading
    }
  },
  computed: {
    // mapState  方法返回一个对象，对象中就是映射过来的容器成员
    //  ...操作符就是把一个对象展开，混入当前对象中
    ...mapState(['user'])
  },
  watch: {},
  created () {
    //   点击显示的文章
    this.loadArticle()
  },
  mounted () {},
  methods: {
    //   点击显示的文章
    async loadArticle () {
      try {
        //   打开状态
        this.loading = true
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
      //   关闭状态
      this.loading = false
    },
    // 收藏操作
    async onCollect () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已收藏，则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          // this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.articleId)
          // this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 点赞操作
    async onLike () {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已经点赞，则取消点赞
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 关注操作
    async onFollow () {
      // 开启按钮的 loading 状态
      this.isFollowLoading = true

      try {
        // 如果已关注，则取消关注
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
          // 否则添加关注
          await addFollow(authorId)
        }

        // 更新视图
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的 loading 状态
      this.isFollowLoading = false
    }

  }
}
</script>

<style scoped lang="less">
@import "./raw.githubusercontent.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
