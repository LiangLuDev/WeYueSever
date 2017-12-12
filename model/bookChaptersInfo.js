/**
 * 图书目录
 */
const dbHelper = require('../dbhelper/db');


let chapterInfo = {
    title: String,
    link: String,
    isVip: Boolean,
    isRead: Boolean,
};

let chaptersSchema = new dbHelper.Schema({
    _id: String,
    source: String,
    book: String,
    chaptersUpdated: String,
    chapters: [chapterInfo],
}, {
    collection: 'book_chapters'
});


const model = dbHelper.db.model('book_chapters', chaptersSchema);
module.exports = model;