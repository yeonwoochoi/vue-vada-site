import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import VueCookies from "vue-cookies";
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueParticles, VueCookies)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCz2cxYlZykp1w-XFcO_2eJhljCd6tY49k',
    libraries: 'places',
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


