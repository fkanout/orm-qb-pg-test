const Koa = require('koa');
const app = new Koa();
const knex = require('./db')

// response
app.use(async ctx => {
    const users = await knex.select().from('user').timeout(1000)
 
    ctx.body = users

    
});

app.listen(3000, ()=> console.info('server running...'));