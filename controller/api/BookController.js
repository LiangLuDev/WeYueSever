const express = require('express');
const router = express.Router();
const constant = require('../../utils/constant');
const classifyInfo = require('../../model/bookClassifyInfo');

//过滤的字段
const video_filter = {
    _id: 0,
    update_time: 0,
    create_date: 0,
    __v: 0,
    update_tag: 0
};

class Bookcontroller {

    constructor() {
    }

    getClassify(req, res, next) {
        classifyInfo.find({},video_filter,(err,data)=>{
            let result='查询出错';
            if (err) {
                console.log(err);
            }else {
                if (data.length === 0) {
                    result='查不到分类';
                }else {
                    result=data;
                }
            }

            res.json({
                code: constant.RESULT_CODE.SUCCESS.code,
                msg: constant.RESULT_CODE.SUCCESS.msg,
                result:result
            });
        });

    }

    addBook(req, res, next) {
        let info = {
            classify_id: '1',//分类id
            name: '玄幻',//分类名称
            book_count: '10086',//分类书籍数
        };

        classifyInfo.create(info, (err, result) => {
            let msg = '';
            if (err) {
                console.log(err);
                msg = '插入失败';
            } else {
                msg = '插入成功';
                console.log('插入成功');

            }

            res.json({
                code: constant.RESULT_CODE.SUCCESS.code,
                msg: constant.RESULT_CODE.SUCCESS.msg,
                result: msg
            });

        });

    }

}


module.exports = new Bookcontroller();