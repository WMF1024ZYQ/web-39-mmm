const cheerio = require("cheerio");
const request = require("superagent");
const fs = require("fs");
const path = require('path');

// 去除空格
function trim(str) {
    if (typeof str !== "string") return str;
    return str
        .replace(/ +/g, " ")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\r\n/g, " ")
        .replace(/  +/g, " ")
        .replace(/^\s+|\s+$/g, "")
        .replace(/^\n+|\n+$/g, "")
        .replace(/'+/g, '"')

}

class Detailed {
    constructor() {
        this.PageID = 2;
        this.list = [];
        this.href = 'https://m.manmanbuy.com/'
    }

    init() {
        request
            .get(`https://m.manmanbuy.com/cuxiao.aspx?PageID=${this.PageID}`)
            .set({
                'Content-Type': 'text/html; charset=gb2312'
            })
            .end(async (err, sres) => {

                let $ = cheerio.load(sres.text);
                // console.log(sres.text)
                let list = $('.ui-border-b');
                console.log(list.length)
                let objs = [];
                list.each(i => {
                    let data = list.eq(i).children("a")
                    objs.push({
                        href: data.attr("href"),
                        minImg: data.children('.pic').children("img").attr("src"),
                        title: data.children('.info').children('.title').text().replace(data.children('.info').children(".title").children("span").text(), ""),
                        price: data.children('.info').children(".title").children("span").text(),
                        time: data.children('.info').children('.other').children('.mall').text()
                    })
                })

                console.log(objs);
            })
    }
}
let str = 'titles.json'
fs.readFile(path.join(__dirname + '/../myData/' + str), 'utf-8', (err, data) => {
    let obj = JSON.parse(data)['RECORDS'];
    let arr = obj.map(v => {
        return {
            "id": v._id.$oid,
            "title": v.title,
            "titleId": v.titleId
        }
    })
    fs.writeFile(path.join(__dirname + '/' + str), JSON.stringify(arr), 'utf8', info => {
        console.log(info)
    });
})