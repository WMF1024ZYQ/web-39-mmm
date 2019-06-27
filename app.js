const Koa = require('koa');
const app = new Koa();
// 视图中间件
const views = require('koa-views');
// json 处理中间件
const json = require('koa-json');
// 异常情况显示页面的中间件
const onerror = require('koa-onerror');
// cors
const cors = require('./DataBase/cors');
// 请求题处理
const koaBody = require('koa-body');
// path
const path = require('path');
// 全局路由
const router = require('./routes/index');
// 命令窗口日志插件
const myLogger = require('./config/index');



// 异常显示的页面模块
onerror(app);
// cors
app.use(cors());
// 处理静态资源中间件
app.use(require('koa-static')(__dirname + '/public'));
// 处理请求体
app.use(koaBody({
    multipart: true,
    encoding: 'utf-8',
    formidable: {
        uploadDir: path.join(__dirname, './public/uploads/'),
        keepExtensions: true
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
}));
// 打印日志
app.use(myLogger);

// 使用ejs模板
app.use(views(__dirname + '/views', {map: {html: 'ejs'}}));

// routes
app.use(router.routes());
app.use(router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
