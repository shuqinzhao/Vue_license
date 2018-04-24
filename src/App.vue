<template>
  <div id="root">
    <Topbar v-if="isLogin" :isLogin="isLogin" />
    <Sidebar v-if="isLogin" :isLogin="isLogin" />
    <div id="app" v-if="isLogin">
      <router-view></router-view>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

import {
  isLogined
} from './utils'

export default {
  name: 'app',
  data () {
    return {
      isLogin: false,
    }
  },
  methods: {
    hidenPageLoading () {
      const pageLoading = document.querySelector('.page--loading')
      if (pageLoading) {
        pageLoading.classList.add('page-hidden')
      }

      if (pageLoading) {
        // remove loading dom
        setTimeout(function () {
          pageLoading.remove()
        }, 3000)
      }
    },
  },
  mounted: function () {
    this.hidenPageLoading()
    this.isLogin = isLogined()
  },
  components: {
    Topbar,
    Sidebar,
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

#root {
  height: 100%;
}
#app {
  padding: 70px 20px 80px 220px;
  height: 100%;
  transition: .3s all;
}
</style>
<style scoped>
  @import './styles/app.scss';
  @import './styles/core.scss';
</style>

