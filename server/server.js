const { resolve } = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const serverStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const qs = require('koa-qs')

const ENV_DEVELOPMENT = 'development'

// conf
const conf = require('../config')
const staticPath = resolve(__dirname, '../', conf.build.assetsRoot)
const SERVER_PROD_PORT = conf.dev.port + 11

// create app
const app = new Koa()
qs(app)
app.use(bodyParser())

// setting static path
app.use(serverStatic(staticPath, {
  gzip: !(conf.dev.env.NODE_ENV === ENV_DEVELOPMENT),
}))

// logger
if (conf.dev.env.NODE_ENV === ENV_DEVELOPMENT) {
  app.use(async (ctx, next) => {
    const start = new Date()

    await next()

    const ms = new Date() - start
    ctx.set('X-Response-Time', `${ms}ms`)
    console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms}ms`)
  })
}

// router config
require('./routes/commonRouter')(new Router({
  prefix: '',
}), app)

// 404 handler
app.use(async (ctx, next) => {
  await next()

  if (ctx.status !== 404) {
    return
  }

  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404
  if (ctx.is('application/json')) {
    ctx.body = {
      error_code: 404,
      message: 'Not Found !',
      data: {},
    }
  } else {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = '<p>Page Not Found</p>'
  }
})

// server start
app.listen(SERVER_PROD_PORT, '0.0.0.0', (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening at http://${'0.0.0.0'}:${SERVER_PROD_PORT}/`)
})
