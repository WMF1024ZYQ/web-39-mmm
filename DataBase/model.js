const mongoose = require("mongoose");

module.exports = {
    // 首页图片
    indexMenu: mongoose.model('indexMenu', new mongoose.Schema({
        indexmenuId: String, //点击跳转的地址
        img: String, //图片地址
        name: String, //标题	
        titlehref: String //分类标题链接地址
    })),

    // 商品列表
    getmoneyctrl: mongoose.model('moneyctrls', new mongoose.Schema({
        productId: String, //商品id
        productName: String, //商品名称
        productPinkage: String, //商品价格
        productFrom: String, //商品来源    
        productTime: String, //发布事件    
        productTips: String, //发布小编    
        productInfo: String, //商品信息1    
        productInfo1: String, //商品信息2    
        productImgSm: String, //商品图片小图    
        productImgLg: String, //商品图片大图    
        productCity: String, //商品购买城市    
        productInfo2: String, //商品信息3    
        productImg2: String, //商品图片2    
        productImg3: String, //商品图片3    
        productComment: String, //商品评论    
        productComCount: String //商品评论数量   
    })),

    // 比价网标题
    titleSchema: mongoose.model('titles', new mongoose.Schema({
        titleId: String, //分类标题id
        title: String, //分类标题内容
    })),

    // 分类菜单列表
    categorySchema: mongoose.model('category', new mongoose.Schema({
        categoryId: String, //点击跳转的地址
        category: String, //图片地址
        titleId: String //标题
    })),


    // 商品列表
    productList: mongoose.model('productLists', new mongoose.Schema({
        productListId: String, //点击跳转的地址
        productId: String, //商品id
        productName: String, //商品名称	
        productImg: String, //商品图片	
        productPrice: String, //商品价格	
        productQuote: String, //商品报价	
        productCom: String, //商品评论次数	
        categoryId: String, //分类id	
        brandId: String, //品牌id	
        brandTitleId: String //品牌标题id	
    })),
    //获取商品详细信息
    productSchema: mongoose.model('products', new mongoose.Schema({
        productId: String, //商品id
        productName: String, //商品名称	
        productImg: String, //商品图片	
        bjShop: String, //比价店铺	
        categoryId: String //分类id
    })),

    // 评论信息
    productCom: mongoose.model('productcoms', new mongoose.Schema({
        comId: String,
        bjShop: String, //比价店铺
        comName: String, //评论人
        comTime: String, //评论时间
        comFrom: String, //评论来源
        comContent: String, //评论内容	
        productId: String, //评论内容	
        categoryId: String //分类id
    })),

    // 国内折扣详情页
    moneyCtrlSchema: mongoose.model('moneyCtrl', new mongoose.Schema({
        productId: String, //商品id
        productName: String, //商品名称
        productPinkage: String, //商品价格
        productFrom: String, //商品来源    
        productTime: String, //发布事件    
        productTips: String, //发布小编    
        productInfo: String, //商品信息1    
        productInfo1: String, //商品信息2    
        productImgSm: String, //商品图片小图    
        productImgLg: String, //商品图片大图    
        productCity: String, //商品购买城市    
        productInfo2: String, //商品信息3    
        productImg2: String, //商品图片2    
        productImg3: String, //商品图片3    
        productComment: String, //商品评论    
        productComCount: String //商品评论数量 
    })),

    inlandDiscountS: mongoose.model('inlandDiscount', new mongoose.Schema({
        productId: String, //商品id
        productName: String, //商品名称
        productPrice: String, //商品价格
        productFrom: String, //商品来源
        productTips: String, //商品小编
        productInfo: String, //商品信息
        productImg: String, //商品图片
        productComment: String //商品评论
    })),
    baicaijiaTitle: mongoose.model('baicaijiaTitle', new mongoose.Schema({
        titleId: Number, //白菜价标题id
        title: String //白菜价标题名称  
    })),
    baicaijiaProduct: mongoose.model('baicaijiaProduct', new mongoose.Schema({
        productId: String, //白菜价商品id
        titleId: String, //白菜价标题id
        productName: String, //白菜价商品名称  
        productImg: String, //白菜价商品图片  
        productPrice: String, //白菜价商品价格   
        productCoupon: String, //白菜价商品优惠
        productHref: String, //白菜价商品链接   
        productCouponRemain: String //白菜价商品链接   
    })),
    coupon: mongoose.model('coupon', new mongoose.Schema({
        couponId: Number, //导航id
        couponImg: String, //导航图片
        couponLink: String, //导航名称
        couponTitle: String //导航链接 
    })),
    couponProductSchema: mongoose.model('couponProduct', new mongoose.Schema({
        couponId: String, //导航id
        couponProductId: String, //导航图片
        couponProductImg: String, //导航名称
        couponProductTime: String, //导航链接  
        couponProductName: String, //导航名称
        couponProductPrice: String //导航链接  
    })),
    gsTitle: mongoose.model('gsTitle', new mongoose.Schema({
        shopId: String, //店铺id
        shopName: String //店铺名称 
    })),
    gsShopArea: mongoose.model('gsShopArea', new mongoose.Schema({
        areaId: String, //区域id
        areaName: String //区域名字 
    })),
    gsProduct: mongoose.model('gsProduct', new mongoose.Schema({
        productId: String, //商品id
        areaId: String, //区域id
        shopId: String, //店铺id
        productPrice: String, //商品价格   
        productImg: String, //商品图片  
        productName: String //商品名称 
    })),
    siteNav: mongoose.model('siteNav', new mongoose.Schema({
        navId: String, //导航id
        navImg: String, //导航图片
        navTitle: String, //导航名称
        navHref: String //导航链接 
    })),
    brandTitle: mongoose.model('brandTitle', new mongoose.Schema({
        brandTitleId: String, //品牌标题id
        brandTitle: String, //品牌大全标题
        categoryId: String //分类id
    })),
    brand: mongoose.model('brand', new mongoose.Schema({
        brandId: String, //品牌id
        brandInfo: String, //品牌信息
        brandName: String, //品牌名称
        brandTitleId: String, //品牌标题id
        categoryId: String //分类id
    }))
}