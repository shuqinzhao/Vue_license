import Vue from 'vue'
import VueI18n from 'vue-i18n'

import LangEn from '../locales/en-US'
import LangZhCN from '../locales/zh-CN'
import LangZhTW from '../locales/zh-TW'


Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'enUS', 
  messages:{
    'enUS': LangEn,
    'zhCN': LangZhCN,
    'zhTW': LangZhTW
  }
})
