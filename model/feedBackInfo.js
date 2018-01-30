/**
 * 用户意见反馈
 */
const dbHelper = require('../dbhelper/db');

let userFeedBackSchema = new dbHelper.Schema({
    qq: String,//qq
    feedback: String,//反馈描述
    date: {type: Date, default: new Date},//反馈时间
}, {
    collection: 'user_feedback'
});

const model = dbHelper.db.model('user_feedback', userFeedBackSchema);
module.exports = model;