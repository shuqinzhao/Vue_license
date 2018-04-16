const proxy = (host = '0.0.0.0', port = '') => {
  // see: https://doc.webpack-china.org/configuration/dev-server/#devserver-proxy
  if (host === '0.0.0.0') { // 修复windows下无法使用0.0.0.0作为目标地址的差异
    host = '127.0.0.1'
  }
  const server = `http://${host}${port === '' ? '' : (':' + port)}`

  return {
    '/api/*': {
      target: server,
      changeOrigin: true
    }
  }
}

module.exports = proxy
