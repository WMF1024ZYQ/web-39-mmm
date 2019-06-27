const mongoose = require('mongoose');
const modules = require('./model');

// 连接数据库
let options = {
    auto_reconnect: true,
    poolSize: 10,
    useNewUrlParser: true,
    keepAlive: 1,
    connectTimeoutMS: 30000
}
// 连接
mongoose.connect('mongodb://localhost/mm', options)
// 监听
mongoose.connection
    .on('error', console.error.bind(console, "connection error:"))
    .on('connected', function () {
        console.log("open mongod --- ok");

    });

// 数据库的各种方法
class DataBash {
    constructor(props) {
        this.schema = props;
    }

    // 异步方法封装
    asyncExec(exec) {
        return new Promise(resolve => exec.exec((...arr) => resolve(arr)))
    }

    // 查询数据
    async find(data, page) {
        let limit = 10;
        let skip = (page - 1) * 10
        return await this
            .asyncExec(this
                .schema
                .find(data)
                .limit(limit)
                .skip(skip))
    }

    // 查询所有数据
    async findAll(data) {
        return await this
            .asyncExec(this
                .schema
                .find(data)
                )
    }

    //查询单个数据
    async findOne(data) {
        return await this
            .asyncExec(this
                .schema
                .findOne(data))
    }

    // 更新
    async update(aims, data) {
        return await this
            .asyncExec(this
                .schema
                .updateOne(aims, data))
    }

    // 添加
    async save(data) {
        return new Promise(resolve => {
            let userData = new this.schema(data);
            userData.save(resolve);
        })

    }

    // 查看数据条数
    async count(data){
        return await this.asyncExec(this.schema
            .countDocuments(data))
    }
};

module.exports = new Proxy({}, {
    get: function (obj, prop, value) {
        return new DataBash(modules[prop])
    },
    set: function () {
        throw new TypeError("装饰器")
    }
})