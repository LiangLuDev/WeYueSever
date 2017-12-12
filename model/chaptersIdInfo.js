/**
 * 目录id
 */
const dbHelper = require('../dbhelper/db');


let chaptersIdSchema = new dbHelper.Schema({
    // _id: String,
    chapterId:String,
    bookId: String,
    link: String,
    lastChapter: String,
    updated: String,
    chaptersCount: Number,
}, {
    collection: 'book_chapters_id'
});


const model = dbHelper.db.model('book_chapters_id', chaptersIdSchema);
module.exports = model;