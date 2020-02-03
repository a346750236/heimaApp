<template>
  <div class="comment-reply">
    <van-nav-bar>
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- 当前评论 -->
    <comment-item :comment="comment" />
    <!-- /当前评论 -->
    <van-cell title="所有回复" />
    <!-- 回复列表 -->
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <comment-item
        :comment="comment"
        v-for="(comment, index) in list"
        :key="index"
      />
    </van-list> -->
    <!-- /回复列表 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon color="#e5645f" name="good-job" />
    </div>
    <!-- /底部区域 -->

    <!-- 发布回复 -->
    <!-- <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <post-comment v-model="postMessage" @click-post="onPost" />
    </van-popup> -->
    <!-- /发布回复 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
// import { getComments, addComment } from '@/api/comment'
// import PostComment from './post-comment'

export default {
  name: 'CommentReply',
  components: {
    CommentItem
    // PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    }

  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
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
}
</style>
