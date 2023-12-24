
const KoaRouter = require('koa-router')
const exportRouter = new KoaRouter()

exportRouter.get('/', async (ctx, next) => {
  console.log('get路由')
  ctx.response.body = 'get路由'
  next()
})

export default exportRouter