/**
 * 用户集合
 */
const dbHelper = require('../dbhelper/db');

let userSchema = new dbHelper.Schema({
    name: String,
    password: String,
    icon: String,
    brief: String
}, {
    collection: 'user_info'
});

const model = dbHelper.db.model('user_info', userSchema);
module.exports = model;
