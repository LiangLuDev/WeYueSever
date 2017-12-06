/**
 * 分类详情列表
 */
const dbHelper = require('../dbhelper/db');

let bookInfoSchema = new dbHelper.Schema({
    _id: String,
    title: String,
    author: String,
    shortIntro: String,
    cover: String,
    majorCate: String,
    minorCate: String,
    contentType: String,
    latelyFollower: Number,
    retentionRatio: Number,
    lastChapter: String,
    tags:Array
}, {
    collection: 'book_classify_detail'
});


const model = dbHelper.db.model('book_classify_detail', bookInfoSchema);
module.exports = model;