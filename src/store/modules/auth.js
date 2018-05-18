import {
  MODULE_LICENSE,
  STORAGE_OBJECT,
  KEY_AUTH,
  fetch,
} from '../../utils'
import docCookies from '../../utils/docCookies'
import {
  userLoginApi
} from '../../services/common'

const state = {
  user: '',
  token: '',
  role: '',
}

const mutations = {
  getAuth(state) {
    const record = STORAGE_OBJECT.getItem(KEY_AUTH)
    let auth = record ? JSON.parse(record) : record

    // TODO: 2016-03-30 为了解决用户打开新页面需要重新登录的问题
    if (!auth && docCookies.hasItem(KEY_AUTH)) {
      auth = JSON.parse(docCookies.getItem(KEY_AUTH))
    } else if (auth && !docCookies.hasItem(KEY_AUTH)) {
      docCookies.setItem(KEY_AUTH, record)
    }

    state = auth
  },
  setAuth(auth) {
    if (auth) {
      const authString = JSON.stringify(auth)

      STORAGE_OBJECT.setItem(KEY_AUTH, authString)
  
      // 写入 cookie
      docCookies.setItem(KEY_AUTH, authString)
    }
  },
  removeAuth() {
    STORAGE_OBJECT.removeItem(KEY_AUTH)
  
    // 移除 cookie
    docCookies.removeItem(KEY_AUTH)
  }
}

const actions = {
  login ({ state, commit }, { name, password } ) {
    return userLoginApi({name, password})
      .then(res => res.json())
      .then(json => {
        Object.assign(state, json.data)
        commit('setAuth', state)

        return state
      })
  },
  logout (context) {
    context.commit('removeAuth')
  }
}

export const auth = {
  state,
  mutations,
  actions,
}