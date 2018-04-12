import {
  MODULE_LICENSE,
  STORAGE_OBJECT,
  KEY_AUTH,
  fetch,
  BACKUP_USER_INFORMATION
} from 'utils'
import docCookies from 'utils/docCookies'

// Utils
const getAuth = () => {
  const record = STORAGE_OBJECT.getItem(KEY_AUTH)
  let auth = record ? JSON.parse(record) : record

  // TODO: 2016-03-30 为了解决用户打开新页面需要重新登录的问题
  if (!auth && docCookies.hasItem(KEY_AUTH)) {
    auth = JSON.parse(docCookies.getItem(KEY_AUTH))
  } else if (auth && !docCookies.hasItem(KEY_AUTH)) {
    docCookies.setItem(KEY_AUTH, record)
  }

  return auth
}
const setAuth = (auth) => {
  if (auth) {
    const authString = JSON.stringify(auth)

    STORAGE_OBJECT.setItem(KEY_AUTH, authString)

    // 写入 cookie
    docCookies.setItem(KEY_AUTH, authString)
  }
}
const removeAuth = () => {
  STORAGE_OBJECT.removeItem(KEY_AUTH)

  // 移除 cookie
  docCookies.removeItem(KEY_AUTH)
}

// Constants
const LOGIN_REQUEST  = 'app/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS  = 'app/auth/LOGIN_SUCCESS'
const LOGIN_FAIL     = 'app/auth/LOGIN_FAIL'
const LOGOUT_REQUEST = 'app/auth/LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL    = 'app/auth/LOGOUT_FAIL'

// Actions
const loginRequest = (name, password) => ({
  type: LOGIN_REQUEST,
  name,
  password
})
const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
})
const loginFail = (error) => ({
  type: LOGIN_FAIL,
  error
})
const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})
const logoutFail = () => ({
  type: LOGOUT_FAIL
})

const logout = () => {
  return (dispatch, getState) => {
    dispatch(logoutSuccess())
  }
}

const login = (name, password) => {
  return (dispatch, getState) => {
    dispatch(loginRequest(name, password))

    // NOTE: 登录模块不需要加前缀
    return fetch(MODULE_LICENSE, '/login', {
      method: 'post',
      body: JSON.stringify({
        name: name,
        password: password
      }),
    })
    .then(req => req.json())
    .then(json => {
      if (json.status === 'success') {
        // return dispatch(loginSuccess(json.data))
        return dispatch(loginSuccess(Object.assign({}, json.data, {
          token: json.data.token,
          username: json.data.user,
          role: json.data.role,
          license_token: json.data.license_token
        })))
      } else {
        return dispatch(loginFail(json.message))
      }
    })
    .catch(error => dispatch(loginFail('The interface returned an error'))) // Account loginName not exists
  }
}

export const actions = {
  login,
  logout
}

// Reducer
const initialState = {
  username: '',
  token: '',
  role: '',
  license_token: '',
  isFetching: false
}
const firstState = Object.assign({}, initialState, getAuth())
const auth = (state = firstState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOGIN_SUCCESS:
      const { username, token, role, license_token } = action.data

      setAuth({
        username,
        token,
        role,
        license_token
      })

      return Object.assign({}, state, {
        username,
        token,
        role,
        license_token,
        isFetching: false
      })
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      })
    case LOGOUT_SUCCESS:
      removeAuth()

      return initialState
    default:
      return state
  }
}

export default auth
