<template>
  <div id="app">
    <!--
      router-view 就是一个动态组件
     -->
    <!-- <router-view /> -->
    <!--
      keep-alive 是 Vue 本身内置的一个组件，专门用来缓存组件的
      官方文档：https://cn.vuejs.org/v2/api/#keep-alive
      默认缓存所有组件
      也可以通过 include 和 exclude 来配置组件缓存
        include 可以配置哪些组件缓存
        exclude 配置哪些组件不要缓存
     -->
    <keep-alive :include="$store.state.cachePages">
      <router-view />
    </keep-alive>
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
