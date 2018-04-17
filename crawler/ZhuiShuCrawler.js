const http = require('request');
const urlEncode = require('urlencode');
const async = require("async");
const classifyBookController = require('../controller/crawlertodb/classifyBookController');
const booksController = require('../controller/crawlertodb/booksController');
const booksDetailController = require('../controller/crawlertodb/booksDetailController');
const bookChaptersController = require('../controller/crawlertodb/bookChaptersController');
const chaptersIdController = require('../controller/crawlertodb/chaptersIdController');
const classifyInfo = require('../model/bookClassifyInfo');
const constant = require('../utils/constant')

const baseUrl = 'http://api.zhuishushenqi.com';


// getBookClassify();
/**
 * 获取图书所有分类（弃用  分类数据存放本地）
 * http://api.zhuishushenqi.com/cats/lv2/statistics
 */
function getBookClassify() {

    http(baseUrl + '/cats/lv2/statistics', (err, res, body) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(body);
        let stringify = JSON.parse(body);
        console.log(stringify);

        classifyBookController.saveOrupdateClassify(stringify);

    });
}


// const classifyUrl="http://api.zhuishushenqi.com/book/by-categories
// ?gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=20";

const classifyUrl = baseUrl + "/book/by-categories?minor=&start=0&limit=10";

// getAllBooks();

/**
 * 根据分类获取所有分类下数据取出ID，然后根据ID拿到书籍详情.     1调用
 */
function getAllBooks(callback) {
    classifyInfo.findOne({}, (err, data) => {
        if (err) {
            console.log(err);
            callback(err, null)
            return;
        }
        //男生、女生、出版
        let details = new Array({name: 'male', detailInfo: constant.BOOK_CLASSIFY.male}
            , {name: 'female', detailInfo: constant.BOOK_CLASSIFY.female}
            , {name: 'press', detailInfo: constant.BOOK_CLASSIFY.press})

        async.mapSeries(details, forBooks, (err, datas) => {
            if (err) {
                console.log(err);
                callback(err, null)
                return;
            }
            callback(null, datas)
            console.log('循环所有分类成功');

        })
    })
}

/**
 * 循环分类拿出所有图书信息存数据库
 * @param info
 * @param gender
 */
function forBooks(info, allBookcallback) {
    async.mapSeries(info.detailInfo, (obj, callback) => {//循环拿出分类数据（玄幻/武侠/仙侠等等）
        let encodeName = urlEncode(obj.name);
        let url = classifyUrl + '&gender=' + info.name + '&type=&major=' + encodeName;
        http(url, (err, res, body) => {
            if (err) {
                console.log(url + '==' + err);
                callback(err, null)
            } else {
                console.log("body==" + body);
                let parse = JSON.parse(body);
                console.log("parse==" + parse);
                if (parse.ok) {
                    parse.books.forEach((book, index) => {
                        booksController.saveBooks(book)//保存书籍
                    })
                } else {
                    console.log(url + parse.msg);
                }

                callback(null, body)
            }
        })

    }, (err, datas) => {
        if (err) {
            allBookcallback(err, null)
            return
        }

        allBookcallback(null, datas)

    })
}

/**
 * 根据数据库中的书籍id 获取书籍详情信息（书籍所有信息）。
 *
 */

//书籍详情 4调用
//http://api.zhuishushenqi.com/book/57b1b41f0ed9a8326ded7cd4
// getBooksInfoById();

function getBooksInfoById(callback) {
    booksController.findAllBook((data) => {

        async.mapSeries(data, (bookinfo, bookinfoCallback) => {
            http(baseUrl + '/book/' + bookinfo._id, (err, res, body) => {//网络操作1
                if (err) {
                    console.log(err);
                    bookinfoCallback(err, null)
                    return;
                }
                console.log(body);
                let stringify = JSON.parse(body);
                console.log(stringify);
                bookChaptersController.findBookChaptersById(bookinfo._id, (err, data) => {//查询书籍目录集合，如果数据库有此书籍目录，才添加书籍
                    if (err) {
                        console.log('查询书籍有误' + err);
                        return;
                    }

                    if (data != null) {
                        booksDetailController.saveOrUpdateBooksDetail(stringify);//保存书籍
                    }
                })

                bookinfoCallback(null, stringify)
            });
        }, (err, datas) => {
            //循环请求网络完毕
            if (!err) {
                callback(null, datas)
            } else {
                callback(err, null)
            }
        })
    })
}

//http://api03icqj.zhuishushenqi.com/btoc?view=summary&book=595323b63d593e951325b9c0
//获取得到书籍目录id   2调用
//http://api.zhuishushenqi.com/btoc?view=summary&book=595327b23ab63fb6496a8441
// getChaptersId()

function getChaptersId(callback) {
    booksController.findAllBook((data) => {
        async.mapSeries(data, (bookinfo, bookinfoCallback) => {
            http(baseUrl + '/btoc?view=summary&book=' + bookinfo._id, (err, res, body) => {//网络操作1
                if (err) {
                    console.log(err);
                    bookinfoCallback(err, null)
                    return;
                }
                console.log(body);
                let stringify = JSON.parse(body);
                console.log(stringify);
                bookinfoCallback(null, stringify)
                let chaptersIdInfo = {};
                if (stringify.length > 0) {//返回空数组的话直接切换链接获取目录
                    let datas = stringify[0];
                    chaptersIdInfo.chapterId = datas._id;
                    chaptersIdInfo.link = datas.link;
                    chaptersIdInfo.lastChapter = datas.lastChapter;
                    chaptersIdInfo.updated = datas.updated;
                    chaptersIdInfo.chaptersCount = datas.chaptersCount;
                    chaptersIdInfo.bookId = bookinfo._id;
                    chaptersIdController.saveOrUpdateChaptersId(chaptersIdInfo);
                } else {
                    noIdForChapters(bookinfo._id)
                }
            });
        }, (err, datas) => {
            if (!err) {
                callback(null, datas)
            } else {
                callback(err, null)
            }
        })
    })
}

/*
*如果获取不到目录id，就切换链接获取目录
 */
function noIdForChapters(book_id) {
    http(baseUrl + '/mix-btoc/' + book_id, (err, res, body) => {
        if (err) {
            console.log(err);
            return;
        }

        let stringify = JSON.parse(body);
        console.log(stringify);
        if (stringify.ok) {
            let mixToc = stringify.mixToc;
            let chapterInfo = {};
            chapterInfo._id = mixToc._id;
            chapterInfo.book = mixToc.book;
            chapterInfo.chaptersUpdated = mixToc.chaptersUpdated;
            chapterInfo.chapters = mixToc.chapters;
            bookChaptersController.saveOrUpdateBookChapters(chapterInfo);
            console.log('获取目录成功')
        }
    })
}


/**
 * 获取书籍章节目录   3调用
 */

// getBookChapters();
function getBookChapters(callback) {
    chaptersIdController.findAllChaptersId((data) => {

        async.mapSeries(data, (bookinfo, bookinfoCallback) => {
            if (bookinfo.chapterId != null) {
                http(baseUrl + '/btoc/' + bookinfo.chapterId + '?view=chapters', (err, res, body) => {
                    if (err) {
                        console.log(err);
                        bookinfoCallback(err, null)
                        return;
                    }
                    if (body != null) {
                        let stringify = JSON.parse(body);
                        console.log(stringify);
                        bookChaptersController.saveOrUpdateBookChapters(stringify);
                    }
                    bookinfoCallback(null, body)
                });
            }
        }, (err, datas) => {
            if (!err) {
                callback(null, datas)
            } else {
                callback(err, null)
            }
        })
    })
}


//推荐书单
//http://api.zhuishushenqi.com/book-list/57b1b41f0ed9a8326ded7cd4/recommend?limit=3
//热门书评
//http://api.zhuishushenqi.com/post/review/best-by-book?book=57b1b41f0ed9a8326ded7cd4
//获取书籍目录（书籍目录id拿不到数据调此接口）
//http://api.zhuishushenqi.com/mix-btoc/573d403c608bed412452479a

//获取得到书籍目录id
//http://api.zhuishushenqi.com/btoc?view=summary&book=595327b23ab63fb6496a8441
//根据上一个接口返回的id拿到目录
//http://api.zhuishushenqi.com/btoc/5a015d83e4ea49bd3ff38f63?view=chapters
//根据目录接口返回的link字段获取正文 此接口不用存服务器  直接app本地调用
//http://chapterup04.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/5a015d83e4ea49bd3ff38f64?cv=1510038915446


exports.getAllBooks = getAllBooks;          //1
exports.getBooksInfoById = getBooksInfoById;    //4
exports.getChaptersId = getChaptersId;          //2
exports.getBookChapters = getBookChapters;    //3

