/**
 * 书籍详情
 */
const dbHelper = require('../dbhelper/db');


let ratinginfo = {
    count: Number,
    score: Number,
    isEffect: Boolean
}

let bookDetailInfoSchema = new dbHelper.Schema({

    _id: String,//书籍id
    title: String,//书名
    author: String,//作者
    longIntro: String,//简介
    cover: String,//图片
    majorCate: String,//玄幻
    minorCate: String,//东方玄幻
    latelyFollower: Number,//追书人数
    retentionRatio: Number,
    lastChapter: String,//最新一章
    gender: Array,//书籍分类 男生、女生
    tags: Array,//图书标签
    rating: ratinginfo,//书评分数信息
    hasCopyright: Boolean,//是否出版
    contentType: String,//书籍类型txt
    wordCount: Number,//总字数
    serializeWordCount: Number,//日更字数
    retentionRatio: String,//留存
    updated: String,//更新时间
    chaptersCount: Number,//最近章节目录
    lastChapter: String,//最近章节目录
    copyright: String,//出版社
    buytype: Number,//是否完结 0完结 2未完结

}, {
    collection: 'book_info_detail'
});


const model = dbHelper.db.model('book_info_detail', bookDetailInfoSchema);
module.exports = model;