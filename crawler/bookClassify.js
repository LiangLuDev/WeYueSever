const https = require('request');
const classifyBookController = require('../controller/crawlertodb/classifyBookController');
const booksController = require('../controller/crawlertodb/booksController');
const booksDetailController = require('../controller/crawlertodb/booksDetailController');
const classifyInfo = require('../model/bookClassifyInfo');
const urlencode = require('urlencode');

const baseUrl = 'https://api.zhuishushenqi.com';

// getBookClassify();
/**
 * 获取图书所有分类
 */
function getBookClassify() {
    https(baseUrl + '/cats/lv2/statistics', (err, res, body) => {
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

const classifyUrl = "http://api.zhuishushenqi.com/book/by-categories?minor=&start=0&limit=20";


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
        let dataArray = new Array(data._doc.male, data._doc.female, data._doc.picture, data._doc.press)
        let classifyArray = new Array('male', 'female', 'picture', 'press');//男生、女生、漫画、出版
        dataArray.forEach((datainfo, index) => {//
            forBooks(datainfo, classifyArray[index]);
        })
    })
}


function forBooks(info, gender) {
    info.forEach(function (obj, index) {//循环拿出分类数据（玄幻/武侠/仙侠等等）
        let encodeName = urlencode(obj.name);
        let url = classifyUrl + '&gender=' + gender + '&type=&major=' + encodeName;
        https(url, (err, res, body) => {
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
getBooksInfoById();
function getBooksInfoById() {
    booksController.findAllBook((data) => {

        data.forEach((bookinfo, index) => {

            https(baseUrl + '/book/' + bookinfo._id, (err, res, body) => {
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

//推荐书单
//http://api.zhuishushenqi.com/book-list/57b1b41f0ed9a8326ded7cd4/recommend?limit=3
//热门书评
//http://api.zhuishushenqi.com/post/review/best-by-book?book=57b1b41f0ed9a8326ded7cd4
//书籍目录
//http://api.zhuishushenqi.com/mix-atoc/57b1b41f0ed9a8326ded7cd4?view=chapter


exports.getBookClassify = getBookClassify;
exports.getAllBooks = getAllBooks;
exports.getBooksInfoById = getBooksInfoById;

