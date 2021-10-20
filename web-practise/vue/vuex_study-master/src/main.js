import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";

Vue.config.productionTip = false

new Vue({
  //定义全局变量, 任何组件内都可以通过this.$store引用该全局变量.注意引用全局变量时, 需带上前缀$
  //等价于Vue.prototype.$store = store
  store,

  render: h => h(App),
}).$mount('#app')
