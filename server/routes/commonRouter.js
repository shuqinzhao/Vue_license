const sleep = require('../utils/sleep')

module.exports = (router, app) => {
  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 登录
  router.post('/api/login', async (ctx) => {
    const postData = ctx.request.body
    const data = require('./data/common/users_auth_post').build(postData.name)

    ctx.body = {
      data,
      message: '',
      error_code: 0,
    }
  })
}
