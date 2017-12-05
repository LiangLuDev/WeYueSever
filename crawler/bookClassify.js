const https = require('request');
const classifyBookController = require('../controller/crawler/classifyBookController');

const baseUrl = 'https://api.zhuishushenqi.com';

getBookClassify();

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

const classifyUrl="http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E7%8E%84%E5%B9%BB&minor=&start=0&limit=20";
// const classifyUrl="http://api.zhuishushenqi.com/book/by-categories
// ?gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=20";
function getBookClassifyDetail() {

}


exports.getBookClassify=getBookClassify;

