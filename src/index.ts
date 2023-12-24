const Koa = require('koa')
const app = new Koa()
import bodyParser from 'koa-bodyparser'
import router from './routers'

app.use(bodyParser())

app.use(async (ctx, next) => {
  console.log(111)
  next()
})

app.use(router.routes())

app.use(async (ctx, next) => {
  console.log(222)
})

app.listen(3000, () => {

})