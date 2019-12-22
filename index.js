const Koa = require('koa');
const app = new Koa();
const Cache = require("./cache");
const cache = new Cache();

app.use(cache.handleCache());
app.use(async (ctx,next) => {

    ctx.body = 'Hello KKBa';
});

app.listen(3000, () => {
    console.log('running on port 3000');
    setTimeout(() => {
        cache.setTimeToClear();
    }, 1000);
})