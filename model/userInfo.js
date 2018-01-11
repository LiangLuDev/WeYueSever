/**
 * 用户集合
 */
const dbHelper = require('../dbhelper/db');

let userSchema = new dbHelper.Schema({
    name: String,//用户名
    nickname: String,//昵称
    password: String,//密码（加密）
    icon: String,//用户头像
    brief: String,//用户简介
    token: String,//用户token
}, {
    collection: 'user_info'
});

const model = dbHelper.db.model('user_info', userSchema);
module.exports = model;
