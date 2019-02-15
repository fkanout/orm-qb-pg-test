const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');



const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods());


const  {knex} = require('./db')
const  {Organizations, Subscriptions} = require('./db/models')

router.post('/qb/organizations', async (ctx, next) => {
    const orgAdded = await knex('organizations').insert(ctx.request.body)
    ctx.body = orgAdded
    await next()
});
 
router.get('/qb/organizations', async (ctx, next) => {
    const allOrg = await knex.select().from('organizations').where({}).timeout(1000)
    ctx.body = allOrg
    await next()
});
    

router.post('/qb/subscriptions', async (ctx, next) => {
    const subAdded = await knex('subscriptions').insert(ctx.request.body)
    ctx.body = subAdded
    await next()
});

 
router.get('/qb/subscriptions', async (ctx, next) => {
    const allSub = await knex.select().from('subscriptions').timeout(1000)
    ctx.body = allSub
    await next()
});




//Objection
router.post('/orm/organizations', async (ctx, next) => {
    const orgAdded = await Organizations.query().insert(ctx.request.body)
    ctx.body = orgAdded
    await next()
});
 
router.get('/orm/organizations', async (ctx, next) => {
    const allOrg = await Organizations.query().limit(ctx.query.limit||10)//page, rage 
    ctx.body = allOrg
    await next()
});

router.get('/orm/organizations/subscriptions', async (ctx, next) => {
    const allOrg = await Organizations.query().eager(`subscriptions${('onlyActive' in ctx.query) ? '(onlyActive)': ''}`);    
    ctx.body = allOrg
    await next()
});

router.get('/orm/organizations/:id/subscriptions', async (ctx, next) => {
    const allOrg = await Organizations.query().where('id', ctx.params.id).eager(`subscriptions${('onlyActive' in ctx.query) ? '(onlyActive)': ''}`);    
    ctx.body = allOrg
    await next()
});

router.get('/orm/subscriptions', async (ctx, next) => {
    const allSub = await Subscriptions.query()    
    ctx.body = allSub
    await next()
});

router.post('/orm/subscriptions', async (ctx, next) => {
    const subAdded = await Subscriptions.query().insert(ctx.request.body);
    ctx.body = subAdded
    await next()
});

app.listen(3000, ()=> console.info('Server running...'));