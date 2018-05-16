<template>
  <div :class="['topbar', isLogin ? '' : 'hide']">
    <div class="container">
      <div class="product fl-l" v-show="isLogin">
        <ul class="product-list">
          <li class="product-item active">
            <a>
              <img src="../../../assets/imgs/Q.png" /> QFusion 控制台
            </a>
          </li>
        </ul>
      </div>

      <div class="fl-r fix">
        <div class="fl-l auth-user dropdown cur-p" v-show="isLogin">
          <div class="dropdown-toggle">
            <i class="fa fa-user mr5"></i>
            <span>{{this.$store.state.auth.username}}</span>
          </div>
          <ul class="dropdown-menu">
            <li class="dropdown-item" @click="handleLogout"><i class="fa fa-sign-out mr5"></i>登出</li>
          </ul>
        </div>

        <div class="fl-l switch-language dropdown">
          <a class="dropdown-toggle" title="切换语言">
            <i class="fa fa-language"></i>
          </a>
          <ul class="dropdown-menu">
            <li class="dropdown-item active" @click="handleSwitchLanguage('zh-CN')">简体中文</li>
            <li class="dropdown-item" @click="handleSwitchLanguage('en-US')">English</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topbar",
  data () {
    return {
      modules: [],
      active: '',
    }
  },
  props: ['isLogin'],
  methods: {
    handleLogout () {
      const { logout, history } = this.props

      logout()
      history.pushState(null, '/login')
    },
    handleSwitchLanguage(language) {
      const { switchLanguage } = this.props

      switchLanguage(language)
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
  @import '../styles/Topbar.scss';
</style>

