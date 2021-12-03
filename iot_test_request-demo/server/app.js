const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static');
const cors = require('koa2-cors');
const controller = require('./controller');
const app = new Koa();
const port = 6288;

app.use(cors({ origin: "*" }));
app.use(staticServer(__dirname, 'public'));
app.use(bodyParser());


app.use(controller('controllers'));
app.use(router.routes());

app.on('error', err => {
    log.error('server error', err)
});

app.listen(port, () => {
    console.log('app is listen on ' + port)
})
