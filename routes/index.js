const router = require('koa-router')();

// 路由分表
let api = require('../DataBase/api');

router
  .get('/api/getindexmenu', api.getindexmenu)
  .get('/api/getmoneyctrl', api.getmoneyctrl)
  .get('/api/getcategorytitle', api.getcategorytitle)
  .get('/api/getcategory', api.getcategory)
  .get('/api/getcategorybyid', api.getcategorybyid)
  .get('/api/getproductlist', api.getproductlist)
  .get('/api/getproduct', api.getproduct)
  .get('/api/getproductcom', api.getproductcom)
  .get('/api/getmoneyctrlproduct', api.getmoneyctrlproduc)
  .get('/api/getinlanddiscount', api.getinlanddiscount)
  .get('/api/getdiscountproduct', api.getdiscountproduct)
  .get('/api/getbaicaijiatitle', api.getbaicaijiatitle)
  .get('/api/getbaicaijiaproduct', api.getbaicaijiaproduct)
  .get('/api/getcoupon', api.getcoupon)
  .get('/api/getcouponproduct', api.getcouponproduct)
  .get('/api/getgsshop', api.getgsshop)
  .get('/api/getgsshoparea', api.getgsshoparea)
  .get('/api/getgsproduct', api.getgsproduct)
  .get('/api/getsitenav', api.getsitenav)
  .get('/api/getbrandtitle', api.getbrandtitle)
  .get('/api/getbrand', api.getbrand)
  .get('/api/getbrandproductlist', api.getbrandproductlist)

// .use('/user', user.routes(), user.allowedMethods()) // 用户接口
// .use('/plugin', plugin.routes(), plugin.allowedMethods()) // 一些功能性的接口
// .use('/houses', house.routes(), house.allowedMethods()) // 查询房屋相关的接口
// .use('/admin', admin.routes(), admin.allowedMethods()) // 管理员相关接
// .use('/config', config.routes(), config.allowedMethods()) // 内部使用接口
// .use('/area', area.routes(), area.allowedMethods())
;
// 静态文件
router
  .get("/swagger", async ctx => await ctx.render('swagger'));

module.exports = router;