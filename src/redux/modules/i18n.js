// Utils
const getStorageLanguage = () => {
  return localStorage.getItem('language')
}
const setStorageLanguage = (language) => {
  return localStorage.setItem('language', language)
}

// Constants
const SWITCH_LANGUAGE = 'app/i18n/SWITCH_LANGUAGE'

// Actions
const switchLanguage = (language) => ({
  type: SWITCH_LANGUAGE,
  language
})

export const actions = {
  switchLanguage
}

// Reducer
const initialState = {
  locales: {
    'zh-CN': require('locales/zh-CN.json'),
    'en-US': require('locales/en-US.json'),
  }
}
const getDefaultLanguage = () => {
  const DEFAULT_LANGUAGE = 'zh-CN'

  let defaultLanguage = DEFAULT_LANGUAGE
  const storageLanguage = getStorageLanguage()

  if (storageLanguage && initialState.locales[storageLanguage]) {
    defaultLanguage = storageLanguage
  } else {
    const nav = window.navigator
    if (nav && nav.language && initialState.locales[nav.language]) {
      defaultLanguage = nav.language
    }
  }

  return defaultLanguage
}

initialState.language = getDefaultLanguage() // 初始化语言环境
initialState.safeI18n = (key) => {
  let locale = initialState.locales[initialState.language]
  return (locale && (typeof locale[key] !== 'undefined')) ? locale[key] : key
}

const i18n = (state = initialState, action = {}) => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      setStorageLanguage(action.language)

      initialState.language = action.language
      return Object.assign({}, state, {
        language: action.language
      })
    default:
      return state
  }
}

export default i18n
