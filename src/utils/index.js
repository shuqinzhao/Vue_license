import isomorphicFetch from 'isomorphic-fetch'
import docCookies from './docCookies'

// QBackup module info
export const BACKUP_MODULE_INFORMATION = {
  QBackup: {
    count: 200,
    version: '3.1.0'
  }
}

// MODULE 常量
export const MODULE_LICENSE = 'license'
export const MODULE = {}
MODULE[MODULE_LICENSE] = {
  key: 'QFusion',
  name: 'QFusion',
  apiprefix: '/api'
}

// storage object
export const STORAGE_OBJECT = sessionStorage // localStorage | sessionStorage
export const KEY_AUTH = `${MODULE_LICENSE}_auth` // BUGFIX(2016-12-05): cookie 相同端口 auth 信息串号

// 定制 fetch 方法
export const fetch = (key = '', api = '', request = {}) => {
  const auth = STORAGE_OBJECT.getItem(KEY_AUTH) ? JSON.parse(STORAGE_OBJECT.getItem(KEY_AUTH)) : STORAGE_OBJECT.getItem(KEY_AUTH)
  const url = [api]

  // mode 属性用来决定是否允许跨域请求，以及哪些 response 属性可读
  // same-origin: 同源策略，如果一个请求是跨院的，那么返回一个简单的 error
  // no-cors: default，允许来自CDN的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求的 method 只能是"HEAD"，"GET"或者"POST"
  // cors: 通常用作跨域请求来从第三方提供的API获取数据。这个模式遵守CORS协议。
  request.mode = request.mode || 'cors'

  request.headers = Object.assign({}, {
    'Accept': '*/*', // application/json, text/plain, */*
    'Content-Type': 'application/json charset=UTF-8' // 'application/x-www-form-urlencoded charset=UTF-8', multipart/form-data, application/json, text/plain
  }, request.headers)
  if (request.headers['Content-Type'] === 'multipart/form-data-import') {
    delete (request.headers['Content-Type'])
  }

  if (auth && auth.token) {
    Object.assign(request.headers, {
      'x-access-token': auth.token
    })
  }

  if (key !== '' && MODULE[key] && MODULE[key].apiprefix) {
    url.unshift(MODULE[key].apiprefix)
  }

  // === api 前后联调,正式发布需要注释该段代码 ===
  // url.unshift('http://192.168.1.137:8080')
  // === api 前后联调,正式发布需要注释该段代码 ===

  return isomorphicFetch(url.join(''), request)
}

// 用户是否登录
export const isLogined = () => {
  let auth = STORAGE_OBJECT.getItem(KEY_AUTH) ? JSON.parse(STORAGE_OBJECT.getItem(KEY_AUTH)) : {}

  // TODO: 2016-03-30 为了解决用户打开新页面需要重新登录的问题

  if ((Object.keys(auth).length === 0) && docCookies.hasItem(KEY_AUTH)) {
    auth = JSON.parse(docCookies.getItem(KEY_AUTH))

    // 同步 cookie 信息到 storage
    STORAGE_OBJECT.setItem(KEY_AUTH, JSON.stringify(auth))
  }

  return Boolean(auth.user && auth.token && auth.role !== undefined)
}
