import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// rem适配： 动态设置 html 标签字体的大小
import 'amfe-flexible'

// 引入文件 封装的vant组件
import './utils/register-vant.js'

// 加载全局样式
// 注意：一定要把我们自己的样式引到第三方组件样式之后
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
