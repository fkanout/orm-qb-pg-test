const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const knex = require('./db')

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods());


router.post('/organizations', async (ctx, next) => {
    const orgAdded = await knex('organizations').insert(ctx.request.body)
    ctx.body = orgAdded
    await next()
});
 
router.get('/organizations', async (ctx, next) => {
    const allOrg = await knex.select().from('organizations').timeout(1000)
    ctx.body = allOrg
    await next()
});
    

router.post('/subscriptions', async (ctx, next) => {
    const orgAdded = await knex('subscriptions').insert(ctx.request.body)
    ctx.body = orgAdded
    await next()
});

 
router.get('/subscriptions', async (ctx, next) => {
    const allOrg = await knex.select().from('subscriptions').timeout(1000)
    ctx.body = allOrg
    await next()
});

app.listen(3000, ()=> console.info('server running...'));