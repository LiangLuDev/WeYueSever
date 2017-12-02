const mongoose = require("mongoose");
const config = require("../config/config.js");

const db = mongoose.createConnection(config.mongodb);
//数据库打开错误
db.on('error', err => {
    console.log(err);
});

exports.db = db;
exports.Schema = mongoose.Schema;
