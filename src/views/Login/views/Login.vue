<template>
  <div class="login">
    <div class="form">
      <form @submit="handleLoginSubmit">
        <fieldset>
          <legend>
            <span>登录</span>
            <ul class="language">
              <li :class="['language__item', this.$i18n.locale === 'zhCN' ? 'active' : '']" data-language="zhCN" @click="handleSwitchLanguage">中文</li>
              <li :class="['language__item', this.$i18n.locale === 'enUS' ? 'active' : '']" data-language="enUS" @click="handleSwitchLanguage">English</li>
            </ul>
          </legend>

          <div class="form__group">
            <label class="form__label">用户名</label>
            <div class="form__control-group">
              <input class="form__control has-icon" type="text" name="name" placeholder="用户名" required="true" autoComplete="off" ref="name" />
              <span class="form__control-icon"><i class="icon icon-user"></i></span>
            </div>
          </div>

          <div class="form__group">
            <label class="form__label">密码</label>
            <div class="form__control-group">
              <input ref="password" class="form__control has-icon" type="password" name="password" placeholder="密码" required="true" autoComplete="new-password" />
              <span class="form__control-icon"><i class="icon icon-lock"></i></span>
            </div>
          </div>

          <div class="form__group captcha">
            <label class="form__label">验证码</label>
            <div class="form__control-group">
              <input ref="captcha" class="form__control has-icon" type="text" name="captcha" placeholder="验证码" required="true" autoComplete="off" />
              <span class="form__control-icon"><i class="icon icon-shield-check"></i></span>
            </div>
            <img class="form__captcha" :src="captcha.dataURL" alt="验证码" @click="handleChangeCaptcha" />
          </div>

          <div class="form__group">
            <button type="submit" class="form__btn form__submit">
              <i class="icon icon-sign-in"></i> 登录
            </button>
          </div>

          <div :class="msg !== '' ? 'form__group form__message show' : 'form__group form__message'">
            <div :class="msg !== '' ? 'login-alert login-alert-info login-alert-danger' : 'login-alert login-alert-info'" >
              <i class="icon icon-close-circle"></i> {{msg}}
            </div>
          </div>
        </fieldset>
      </form>
    </div>

    <div class="info">
      <h3 class="info__hd">
        <a :href="link" target="_blank">
          <img class="info__logo" :src="infoLogo" alt="沃趣科技" />
        </a>
      </h3>

      <div class="info__bd">
        <h1 class="info__title">QLicense</h1>
        <p class="info__desc">QLicense</p>
      </div>

      <div class="info__version">版本: 1.0.0</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import captchajs from '../../../libs/captcha.js'
import {
  isLogined,
} from '../../../utils'

export default {
  name: 'login',
  data () {
    return {
      msg: '',
      infoLogo: '../../../assets/imgs/brand.png',
      captcha: captchajs(),
      link: '#',
    }
  },
  methods: {
    handleLoginSubmit: function (e) {
      e.preventDefault()

      const name = this.$refs.name.value.trim()
      const password = this.$refs.password.value.trim()
      const captchaText = this.$refs.captcha.value.trim()

      if (name === '' || password === '') {
        return
      }

      if (this.captcha.code.toLocaleLowerCase() !== captchaText.toLocaleLowerCase()) {
        this.msg = '验证码错误'
        this.captcha = captchajs()
        this.$refs.captcha.value = ''
        this.$refs.captcha.focus()

        return
      }

      this.login({name, password})
    },
    handleChangeCaptcha: function () {
      this.captcha = captchajs()
    },
    handleSwitchLanguage: function (e) {
      const language = e.target.dataset.language
      const local = this.$i18n.locale

      if (language === local) {
        return
      } else {
        this.$i18n.locale = language
      }
    },
    ...mapActions(['logout', 'login'])
  },
  mounted: function () {
    document.querySelector('body').classList.add('body--login')
    this.logout()
    this.handleChangeCaptcha()
  },
}
</script>

<style scoped>
  @import '../styles/login.scss';
</style>
