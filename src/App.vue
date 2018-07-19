<template>
  <div id="root">
    <div id="app" v-if="isLogin">
      <router-view></router-view>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import {
  isLogined
} from './utils'

export default {
  name: 'app',
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
  },
  computed: {
    isLogin: function () {
      return isLogined()
    },
  }
}
</script>

<style>
  @import './styles/app.scss';
  @import './styles/core.scss';
</style>

