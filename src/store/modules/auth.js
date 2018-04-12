import {
  MODULE_LICENSE,
  STORAGE_OBJECT,
  KEY_AUTH,
  fetch,
  BACKUP_USER_INFORMATION
} from '../../utils'
import docCookies from '../../utils/docCookies'

const state = {
  username: '',
  token: '',
  role: '',
  license_token: '',
  isFetching: false
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

    state.auth = auth
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
  login ({ state }, { name, password } ) {
    return new Promise((resolve, reject) => {
      fetch(MODULE_LICENSE, '/login', {
        method: 'post',
        body: JSON.stringify({
          name: name,
          password: password
        }),
      })
      .then(req => req.json())
      .then(json => {
        if (json.status === 'success') {
          state.auth = Object.assign({}, state.auth, {
            token: json.data.token,
            username: json.data.user,
            role: json.data.role,
            license_token: json.data.license_token
          })
        } else {
          reject(new Error('The interface returned an error'))
        }
      })
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