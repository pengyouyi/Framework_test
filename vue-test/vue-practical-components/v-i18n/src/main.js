// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let i18n = new VueI18n({
	locale: 'english',  // 语言标识
	// this.$i18n.locale  // 通过切换locale的值来实现语言切换
	messages: {
		'english': require('./i18n/english'),  // 英文语言包
		'chinese': require('./i18n/chinese')  // 中文语言包
	}
})

Vue.config.productionTip = false

router.afterEach(() => {
	Vue.prototype.$lang = router.currentRoute.meta.lang;
	i18n.locale = router.currentRoute.meta.lang
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
