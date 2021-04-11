import Vue from 'vue'
import router from './router'
import vuetify from './plugins/vuetify';

//Components
import App from './App.vue'


Vue.config.productionTip = false

//vue instance
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');


