const dbHelper = require('../dbhelper/db');


let bookInfo = {

    name: String,
    bookCount: String,
    monthlyCount: String,
    icon: String,

};

let classifySchema = new dbHelper.Schema({
    male: [bookInfo],
    female: [bookInfo],
    picture: [bookInfo],
    press: [bookInfo],
}, {
    collection: 'books_classify'
});


const model = dbHelper.db.model('books_classify', classifySchema);
module.exports = model;