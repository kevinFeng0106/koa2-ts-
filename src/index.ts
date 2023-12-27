const Koa = require('koa')
const app = new Koa()
import bodyParser from 'koa-bodyparser'
import router from './routers'

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {

})