const models = require("./index");

module.exports = {
    // 请求首页的数据
    getindexmenu: async ctx => {
        let [err, list] = await models['indexMenu'].findAll({})
        // console.log(list)
        ctx.body = {
            status: 200,
            description: "请求成功",
            result: list.map(v => ({
                indexmenuId: v.indexmenuId,
                name: v.name,
                titlehref: v.titlehref,
                img: v.img
            }))
        }
    },

    // 获取折扣列表页
    getmoneyctrl: async ctx => {
        let {
            pageid = 1
        } = ctx.query;
        if (!pageid * 1) {
            return ctx.body = {
                status: 400,
                description: '传入的页数异常',
                result: null
            }
        }
        let [err, list] = await models['getmoneyctrl'].find({}, pageid)

        let [err2, count] = await models['getmoneyctrl'].count({});
        ctx.body = {
            status: 200,
            description: "请求成功",
            result: list.map(v => ({
                productId: v.productId,
                productName: v.productName,
                productPinkage: v.productPinkage, //商品价格
                productFrom: v.productFrom, //商品来源    
                productTime: v.productTime, //发布事件    
                productTips: v.productTips, //发布小编    
                productInfo: v.productInfo, //商品信息1    
                productInfo1: v.productInfo1, //商品信息2    
                productImgSm: JSON.parse(v.productImgSm), //商品图片小图    
                productImgLg: JSON.parse(v.productImgLg), //商品图片大图    
                productCity: JSON.parse(v.productCity), //商品购买城市    
                productInfo2: v.productInfo2, //商品信息3    
                productImg2: JSON.parse(v.productImg2), //商品图片2    
                productComment: JSON.parse(v.productComment), //商品评论    
                productComCount: v.productComCount //商品评论数量  
            })),
            count
        }
    },

    // 获取分类标题信息
    getcategorytitle: async ctx => {
        let [err, list] = await models['titleSchema'].findAll({})
        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                "titleId": v.titleId,
                "title": v.title
            }))
        }
    },

    // 根据标题id 返回对应的数据
    getcategory: async ctx => {
        let {
            titleid: titleId = 0
        } = ctx.query;
        console.log(titleId)
        let [err, list] = await models['categorySchema'].findAll({
            titleId
        })

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                categoryId: v.categoryId, //点击跳转的地址
                category: v.category, //图片地址
                titleId: v.titleId //标题
            }))
        }
    },

    // 获取分类名称
    getcategorybyid: async ctx => {
        let {
            categoryid: categoryId = 1
        } = ctx.query;

        let [err, data] = await models['categorySchema'].findOne({
            categoryId
        })
        ctx.body = {
            status: 200,
            description: '请求成功',
            result: {
                categoryId: data.categoryId, //点击跳转的地址
                category: data.category, //图片地址
                titleId: data.titleId //标题
            }
        }
    },

    ///api/getproductlist
    // 根据分类id和分页返回对应的商品列表
    getproductlist: async ctx => {
        let {
            pageid = 1, categoryid: categoryId = "0"
        } = ctx.query;
        categoryId += ''
        // 查询总数
        let [err, count] = await models['productList'].count({
            categoryId
        });
        // 查询商品列表
        let [err1, list] = await models['productList'].find({
            categoryId
        }, pageid)

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: {
                count,
                list: list.map(v => ({
                    productListId: v.productListId, //点击跳转的地址
                    productId: v.productId, //商品id
                    productName: v.productName, //商品名称	
                    productImg: JSON.parse(v.productImg), //商品图片	
                    productPrice: v.productPrice, //商品价格	
                    productQuote: v.productQuote, //商品报价	
                    productCom: v.productCom, //商品评论次数	
                    categoryId: v.categoryId, //分类id	
                    brandId: v.brandId, //品牌id	
                    brandTitleId: v.brandTitleId //品牌标题id	
                }))
            }
        }
    },

    // 商品详情页
    // /api/getproduct
    getproduct: async ctx => {
        let {
            productid: productId = '1'
        } = ctx.query
        let [err, data] = await models['productSchema'].findOne({
            productId
        })
        ctx.body = {
            status: 200,
            description: '请求成功',
            result: {
                productId: data.productId, //商品id
                productName: data.productName, //商品名称	
                productImg: JSON.parse(data.productImg), //商品图片	
                bjShop: data.bjShop, //比价店铺	
                categoryId: data.categoryId //分类id
            }
        }
    },

    // 商品 评论信息
    ///api/getproductcom
    getproductcom: async ctx => {
        let {
            productid: productId = '1'
        } = ctx.query;

        let [err, list] = await models['productCom'].findAll({
            productId
        })

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                bjShop: v.bjShop, //比价店铺
                comName: v.comName, //评论人
                comTime: v.comTime, //评论时间
                comFrom: v.comFrom, //评论来源
                comContent: v.comContent, //评论内容	
                productId: v.productId, //评论内容	
                categoryId: v.categoryId //分类id
            }))
        }
    },

    // 国内折扣详情页
    // /api/getmoneyctrlproduc
    getmoneyctrlproduc: async ctx => {
        let {
            productid: productId = 1
        } = ctx.query

        let [err, data] = await models['moneyCtrlSchema'].findOne({
            productId
        })

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: {
                productId: data.productId,
                productName: data.productName,
                productPinkage: data.productPinkage, //商品价格
                productFrom: data.productFrom, //商品来源    
                productTime: data.productTime, //发布事件    
                productTips: data.productTips, //发布小编    
                productInfo: data.productInfo, //商品信息1    
                productInfo1: data.productInfo1, //商品信息2    
                productImgSm: JSON.parse(data.productImgSm), //商品图片小图    
                productImgLg: JSON.parse(data.productImgLg), //商品图片大图    
                productCity: JSON.parse(data.productCity), //商品购买城市    
                productInfo2: data.productInfo2, //商品信息3    
                productImg2: JSON.parse(data.productImg2), //商品图片2    
                productComment: JSON.parse(data.productComment), //商品评论    
                productComCount: data.productComCount //商品评论数量  
            }
        }
    },

    // 国内折扣列表页
    // /api/getinlanddiscount
    getinlanddiscount: async ctx => {

        let [err, list] = await models['inlandDiscountS'].findAll({})

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                productId: v.productId, //商品id
                productName: v.productName, //商品名称
                productPrice: v.productPrice, //商品价格
                productFrom: v.productFrom, //商品来源
                productTips: v.productTips, //商品小编
                productInfo: v.productInfo, //商品信息
                productImg: JSON.parse(v.productImg), //商品图片
                productComment: v.productComment //商品评论
            }))
        }
    },

    // 国内折扣详情页
    // /api/getdiscountproduct
    getdiscountproduct: async ctx => {
        let {
            productid: productId = "1"
        } = ctx.query;

        let [err, data] = await models['inlandDiscountS'].findOne({
            productId
        });
        ctx.body = {
            status: 200,
            description: '请求成功',
            result: {
                productId: data.productId, //商品id
                productName: data.productName, //商品名称
                productPrice: data.productPrice, //商品价格
                productFrom: data.productFrom, //商品来源
                productTips: data.productTips, //商品小编
                productInfo: data.productInfo, //商品信息
                productImg: JSON.parse(data.productImg), //商品图片
                productComment: data.productComment //商品评论
            }
        }
    },

    //白菜价tab标题
    // /api/getbaicaijiatitle
    getbaicaijiatitle: async ctx => {
        let [err, list] = await models['baicaijiaTitle'].findAll({})
        ctx.body = {
            status: 200,
            description: "请求成功",
            result: list.map(v => ({
                titleId: v.titleId, //白菜价标题id
                title: v.title //白菜价标题名称 
            }))
        }
    },

    // 白菜价商品列表
    // /api/getbaicaijiaproduct
    getbaicaijiaproduct: async ctx => {
        let {
            titleid: titleId = 1
        } = ctx.query;

        let [err, list] = await models['baicaijiaProduct'].findAll({
            titleId
        })

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                productId: v.productId, //白菜价商品id
                titleId: v.titleId, //白菜价标题id
                productName: v.productName, //白菜价商品名称  
                productImg: v.productImg, //白菜价商品图片  
                productPrice: v.productPrice, //白菜价商品价格   
                productCoupon: JSON.parse(v.productCoupon), //白菜价商品优惠
                productHref: v.productHref, //白菜价商品链接   
                productCouponRemain: v.productCouponRemain //白菜价商品链接   
            }))
        }
    },
    //优惠券
    ///api/getcoupon
    getcoupon: async ctx => {

        let [err, list] = await models['coupon'].findAll({})

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                couponId: v.couponId, //导航id
                couponImg: v.couponImg, //导航图片
                couponLink: v.couponLink, //导航名称
                couponTitle: v.couponTitle //导航链接 
            }))
        }
    },
    //优惠卷商品列表
    // /api/getcouponproduct
    getcouponproduct: async ctx => {
        let {
            couponid: couponId = '1'
        } = ctx.query

        let [err, data] = await models['couponProductSchema'].findAll({
            couponId
        })

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: data.map(v => ({
                couponId: v.couponId, //导航id
                couponProductId: v.couponProductId, //导航图片
                couponProductImg: JSON.parse(v.couponProductImg), //导航名称
                couponProductTime: v.couponProductTime, //导航链接  
                couponProductName: v.couponProductName, //导航名称
                couponProductPrice: v.couponProductPrice //导航链接  
            }))
        }
    },
    //获取凑单品的店铺的信息
    ///api/getgsshop
    getgsshop: async ctx => {

        let [err, list] = await models['gsTitle'].findAll()

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                shopId: v.shopId, //店铺id
                shopName: v.shopName //店铺名称 
            }))
        }
    },
    // 获取地区
    // /api/getgsshoparea
    getgsshoparea: async ctx => {

        let [err, list] = await models['gsShopArea'].findAll({})

        ctx.body = {
            status: 200,
            description: '数据请求成功',
            result: list.map(v => ({
                areaId: v.areaId, //区域id
                areaName: v.areaName //区域名字  
            }))
        }
    },
    // /api/getgsproduct
    // 凑单品商品数据	
    getgsproduct: async ctx => {
        let {
            shopid: shopId = 1,
            areaid: areaId = 1
        } = ctx.query;

        let [err, list] = await models['gsProduct'].findAll({
            areaId,
            shopId
        })

        ctx.body = {
            status: 200,
            description: '数据请求成功',
            result: list.map(v => ({
                productId: v.productId, //商品id
                areaId: v.areaId, //区域id
                shopId: v.shopId, //店铺id
                productPrice: v.productPrice, //商品价格   
                productImg: v.productImg, //商品图片  
                productName: v.productName //商品名称 
            }))
        }
    },
    // 商城导航
    // /api/getsitenav
    getsitenav: async ctx => {

        let [err, list] = await models['siteNav'].findAll({})
        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                navId: v.navId, //导航id
                navImg: v.navImg, //导航图片
                navTitle: v.navTitle, //导航名称
                navHref: v.navHref //导航链接 
            }))
        }
    },
    ///api/getbrandtitle
    // 获取品牌大全的标题信息
    getbrandtitle: async ctx => {
        let [err, list] = await models['brandTitle'].findAll({})

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: list.map(v => ({
                brandTitleId: v.brandTitleId, //品牌标题id
                brandTitle: v.brandTitle, //品牌大全标题
                categoryId: v.categoryId //分类id
            }))
        }
    },
    ///api/getbrand
    //  十大品牌列表
    getbrand: async ctx => {
        let {
            brandtitleid: brandTitleId = "1"
        } = ctx.query;

        let [err, data] = await models['brand'].findAll({
            brandTitleId
        })

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: data.map(v => ({
                brandId: v.brandId, //品牌id
                brandInfo: v.brandInfo, //品牌信息
                brandName: v.brandName, //品牌名称
                brandTitleId: v.brandTitleId, //品牌标题id
                categoryId: v.categoryId //分类id
            }))
        }
    },
    // /api/getbrandproductlist
    //销量排行列表商品
    getbrandproductlist: async ctx => {
        let {
            brandtitleid: brandTitleId = "1"
        } = ctx.query;
        let [err1, list] = await models['productList'].findAll({
            brandTitleId
        })
        // 查询总数
        let [err, count] = await models['productList'].count({
            brandTitleId
        });

        ctx.body = {
            status: 200,
            description: '请求成功',
            result: {
                count,
                list: list.map(v => ({
                    productListId: v.productListId, //点击跳转的地址
                    productId: v.productId, //商品id
                    productName: v.productName, //商品名称	
                    productImg: JSON.parse(v.productImg), //商品图片	
                    productPrice: v.productPrice, //商品价格	
                    productQuote: v.productQuote, //商品报价	
                    productCom: v.productCom, //商品评论次数	
                    categoryId: v.categoryId, //分类id	
                    brandId: v.brandId, //品牌id	
                    brandTitleId: v.brandTitleId //品牌标题id	
                }))
            }
        }

    }
}