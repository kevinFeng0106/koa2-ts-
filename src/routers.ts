
const KoaRouter = require('koa-router')
import multer from '@koa/multer'
const exportRouter = new KoaRouter()

const upload = multer()

// upload.single() 的调用必须放在路由中间件的最前面才会生效
exportRouter.use('/afile', upload.single('avatar'))
exportRouter.use(async (ctx, next) => {
  console.log('所有路由的前置中间件')
  next()
})

exportRouter.get('/',
  async (ctx, next) => {
    ctx.response.body = {
      param: 'get路由'
    }
    next()
  }
)

// 一般 post 路由
exportRouter.post('/',
  async (ctx, next) => {
    console.log('请求体', ctx.request.body)
    ctx.response.body = 'post一般路由'
    next()
  }
)

// 处理文件 post 路由
exportRouter.post('/afile',
  async (ctx, next) => {
    console.log('请求单个文件', ctx.request.file)
    ctx.response.body = 'post文件路由'
  }
)

export default exportRouter