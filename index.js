const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const  {knex} = require('./db')
const  {Organizations, Subscriptions, Offerings} = require('./db/models')
const  findQuery = require('objection-find');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods());


const to = (promise) => {
    return promise
      .then(data => [null, data])
      .catch(err => [err, null])
  }

  
router.post('/qb/organizations', async (ctx, next) => {
    const orgAdded = await to(knex('organizations').insert(ctx.request.body))
    ctx.body = orgAdded
    await next()
});
 
router.get('/qb/organizations', async (ctx, next) => {
    const allOrg = await to(knex.select().from('organizations').where({}).timeout(1000))
    ctx.body = allOrg
    await next()
});
    

router.post('/qb/subscriptions', async (ctx, next) => {
    const subAdded = await to(knex('subscriptions').insert(ctx.request.body))
    ctx.body = subAdded
    await next()
});

 
router.get('/qb/subscriptions', async (ctx, next) => {
    const allSub = await to(knex.select().from('subscriptions').timeout(1000))
    ctx.body = allSub
    await next()
});




//*****************/Objection

// *********** Organizations
router.post('/orm/organizations', async (ctx, next) => {
    const orgAdded = await to(Organizations.query().insert(ctx.request.body))
    ctx.body = orgAdded
    await next()
});
 
router.get('/orm/organizations', async (ctx, next) => {
    ctx.body = await findQuery(Organizations)
        .allow(['id', 'domain', 'subscriptions.id', 'subscriptions.status'])
        .allowEager('subscriptions.[offerings]')
        .build(ctx.query)
    await next()
});

router.get('/orm/organizations/subscriptions', async (ctx, next) => {
    const allOrg = await to(Organizations.query().eager(`subscriptions${('onlyActive' in ctx.query) ? '(onlyActive)': ''}`))    
    ctx.body = allOrg
    await next()
});

router.get('/orm/organizations/:id/subscriptions', async (ctx, next) => {
    const oneOrg = await to(Organizations.query().where('id', ctx.params.id).eager(`subscriptions${('onlyActive' in ctx.query) ? '(onlyActive)': ''}`));    
    ctx.body = oneOrg
    await next()
});
router.get('/orm/organizations/:id/subscriptions/offerings', async (ctx, next) => {
    const oneOrg = await to(Organizations.query().where('id', ctx.params.id).eager(`subscriptions(onlyActive).[offerings]`));    
    ctx.body = oneOrg
    await next()
});
// *************************



// *********** Subscriptions
router.get('/orm/subscriptions', async (ctx, next) => {
    const allSub = await to(Subscriptions.query())    
    ctx.body = allSub
    await next()
});

router.post('/orm/subscriptions', async (ctx, next) => {
    const subAdded = await to(Subscriptions.query().insert(ctx.request.body))
    ctx.body = subAdded
    await next()
});
// *************************


// *********** Offerings
router.get('/orm/offerings', async (ctx, next) => {
    const allOfferings = to(await Offerings.query())
    ctx.body = allOfferings
    await next()
});
// *************************

const graphQlBuilder = require('objection-graphql').builder;
const graphqlHTTP = require('koa-graphql');

const graphQlSchema = graphQlBuilder()
  .model(Organizations)
  .model(Subscriptions)
  .model(Offerings)
  .build();

router.all('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    graphiql: true
  }));
app.listen(3000, ()=> console.info('Server running...'));