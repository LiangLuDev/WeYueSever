/**
 * 分类详情列表
 */
const dbHelper = require('../dbhelper/db');

let bookInfo = {
    _id: String,
    title: String,
    author: String,
    shortIntro: String,
    cover: String,
    site: String,
    majorCate: String,
    minorCate: String,
    sizetype: Number,
    superscript: String,
    contentType: String,
    allowMonthly: Boolean,
    banned: Number,
    latelyFollower: Number,
    retentionRatio: Boolean,
    lastChapter: String,
    tags: Array
};

let classifyDetailSchema = new dbHelper.Schema({
    total: Number,
    books: bookInfo,
    ok: Boolean
}, {
    collection: 'book_classify_detail'
});


const model = dbHelper.db.model('book_classify_detail', classifyDetailSchema);
module.exports = model;