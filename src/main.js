// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {
  store
} from './store/index.js'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',

  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDLslJSfB576XGAU151FjN4fFrGxepGNWY",
      authDomain: "todo-app-d6539.firebaseapp.com",
      databaseURL: "https://todo-app-d6539.firebaseio.com",
      projectId: "todo-app-d6539",
      storageBucket: "todo-app-d6539.appspot.com",
    })
  }
})
