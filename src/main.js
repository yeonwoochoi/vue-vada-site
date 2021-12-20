import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import VueCookies from "vue-cookies";
import * as VueGoogleMaps from 'vue2-google-maps'
import {googleMapKey} from "@/config/config";
import VueCarousel from 'vue-carousel';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';


Vue.use(VueCarousel);

Vue.use(VueParticles, VueCookies)

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.config.productionTip = false
Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}

Vue.use(VueGoogleMaps, {
  load: {
    key: googleMapKey,
    libraries: 'places',
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


