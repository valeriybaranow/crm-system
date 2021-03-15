import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directiv'
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyBMk2CX6g_8PxAlLZdnRA4GXfbH9sthZUY',
  authDomain: 'vue--crm-aadc8.firebaseapp.com',
  databaseURL: 'https://vue--crm-aadc8.firebaseio.com',
  projectId: 'vue--crm-aadc8',
  storageBucket: 'vue--crm-aadc8.appspot.com',
  messagingSenderId: '1079455110215',
  appId: '1:1079455110215:web:1ee623fd2aa4f471ab0d62',
  measurementId: 'G-3FD306B9QE'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
