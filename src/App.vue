<template>
  <div id="app">
    <!-- 跟路由出口 -->
    <div class="box">Hello Word</div>
    <!-- 标签 -->
    <van-icon name="gem-o" />
    <!-- 这种是引入自己改名字 -->
    <van-icon class-prefix="icon" name="NBA" />
    <!-- 这种是直接使用图标 -->
    <i class="icon icon-NBA"></i>
    <!-- 使用van组件   -->
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-icon name="chat-o" color="#1989fa" />
    <!-- 使用van组件 -->
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// @ 是 src 目录的别名
export default {
  name: 'App'
}
</script>
<style lang="less">
// 注意： 在 style 中 使用@ 别名，需要在前面加~
// @ 之后必须有 /
// 如果你加载的资源就是相对于当前目录，建议还是 ./
// @import url("~@/styles/variables.less");

// .box {
//   color: @color-primary;
// }
</style>
