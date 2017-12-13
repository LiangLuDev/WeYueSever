const http = require('request');
const classifyBookController = require('../controller/crawlertodb/classifyBookController');
const booksController = require('../controller/crawlertodb/booksController');
const booksDetailController = require('../controller/crawlertodb/booksDetailController');
const bookChaptersController = require('../controller/crawlertodb/bookChaptersController');
const chaptersIdController = require('../controller/crawlertodb/chaptersIdController');
const classifyInfo = require('../model/bookClassifyInfo');
const urlencode = require('urlencode');

const baseUrl = 'http://api.zhuishushenqi.com';
const baseUrlicqj = 'http://api09icqj.zhuishushenqi.com';

// getBookClassify();
/**
 * 获取图书所有分类
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

const classifyUrl = baseUrl + "/book/by-categories?minor=&start=0&limit=30";


// getAllBooks();

/**
 * 根据分类获取所有分类下数据取出ID，然后根据ID拿到书籍详情。
 */
function getAllBooks() {
    classifyInfo.findOne({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let dataArray = new Array(data._doc.male, data._doc.female, data._doc.press)
        let classifyArray = new Array('male', 'female', 'picture', 'press');//男生、女生、出版
        dataArray.forEach((datainfo, index) => {//
            forBooks(datainfo, classifyArray[index]);
        })
    })
}

/**
 * 循环分类拿出所有图书信息存数据库
 * @param info
 * @param gender
 */
function forBooks(info, gender) {
    info.forEach(function (obj, index) {//循环拿出分类数据（玄幻/武侠/仙侠等等）
        let encodeName = urlencode(obj.name);
        let url = classifyUrl + '&gender=' + gender + '&type=&major=' + encodeName;
        http(url, (err, res, body) => {
            if (err) {
                console.log(url + '==' + err);
            } else {
                console.log("body==" + body);
                let parse = JSON.parse(body);
                console.log("parse==" + parse);
                if (parse.ok) {
                    parse.books.forEach((book, index) => {
                        booksController.saveBooks(book)
                    })
                } else {
                    console.log(url + parse.msg);
                }
            }

        })


    });
}

/**
 * 根据数据库中的书籍id 获取书籍详情信息（书籍所有信息）。
 *
 */

//书籍详情
//http://api.zhuishushenqi.com/book/57b1b41f0ed9a8326ded7cd4
// getBooksInfoById();
function getBooksInfoById() {
    booksController.findAllBook((data) => {

        data.forEach((bookinfo, index) => {//循环数据库

            http(baseUrl + '/book/' + bookinfo._id, (err, res, body) => {//网络操作1
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(body);
                let stringify = JSON.parse(body);
                console.log(stringify);

                booksDetailController.saveOrUpdateBooksDetail(stringify);
            });
        })
    })
}

//http://api03icqj.zhuishushenqi.com/btoc?view=summary&book=595323b63d593e951325b9c0
//获取得到书籍目录id
//http://api.zhuishushenqi.com/btoc?view=summary&book=595327b23ab63fb6496a8441
// getChaptersId()

function getChaptersId() {
    booksController.findAllBook((data) => {

        data.forEach((bookinfo, index) => {//循环数据库
            http(baseUrl + '/btoc?view=summary&book=' + bookinfo._id, (err, res, body) => {//网络操作1
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(body);
                let stringify = JSON.parse(body);
                console.log(stringify);
                let chaptersIdInfo = {};
                if (stringify.length > 0) {
                    let datas = stringify[0];
                    // chaptersIdInfo._id = datas._id;
                    chaptersIdInfo.chapterId = datas._id;
                    chaptersIdInfo.link = datas.link;
                    chaptersIdInfo.lastChapter = datas.lastChapter;
                    chaptersIdInfo.updated = datas.updated;
                    chaptersIdInfo.chaptersCount = datas.chaptersCount;
                    chaptersIdInfo.bookId = bookinfo._id;
                } else {
                    chaptersIdInfo.bookId = bookinfo._id;
                }
                chaptersIdController.saveOrUpdateChaptersId(chaptersIdInfo);


            });
        })
    })
}

/**
 * 获取书籍章节目录
 */

// getBookChapters();
function getBookChapters() {
    chaptersIdController.findAllChaptersId((data) => {

        data.forEach((bookinfo, index) => {
            if (bookinfo.chapterId != null) {
                http(baseUrl + '/btoc/' + bookinfo.chapterId + '?view=chapters', (err, res, body) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (body != null) {
                        let stringify = JSON.parse(body);
                        console.log(stringify);
                        bookChaptersController.saveOrUpdateBookChapters(stringify);
                    }
                });
            }
        })
    })
}


//推荐书单
//http://api.zhuishushenqi.com/book-list/57b1b41f0ed9a8326ded7cd4/recommend?limit=3
//热门书评
//http://api.zhuishushenqi.com/post/review/best-by-book?book=57b1b41f0ed9a8326ded7cd4
//获取书籍目录（书籍目录id拿不到数据调此接口）
//http://api03icqj.zhuishushenqi.com/mix-btoc/573d403c608bed412452479a

//获取得到书籍目录id
//http://api.zhuishushenqi.com/btoc?view=summary&book=595327b23ab63fb6496a8441
//根据上一个接口返回的id拿到目录
//http://api.zhuishushenqi.com/btoc/5a015d83e4ea49bd3ff38f63?view=chapters
//根据目录接口返回的link字段获取正文 此接口不用存服务器  直接app本地调用
//http://chapterup04.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/5a015d83e4ea49bd3ff38f64?cv=1510038915446


exports.getBookClassify = getBookClassify;
exports.getAllBooks = getAllBooks;
exports.getBooksInfoById = getBooksInfoById;
exports.getChaptersId = getChaptersId;
exports.getBookChapters = getBookChapters;

