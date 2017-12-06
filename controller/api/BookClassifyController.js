const express = require('express');
const router = express.Router();
const constant = require('../../utils/constant');
const classifyInfo = require('../../model/bookClassifyInfo');
const booksInfo = require('../../model/booksInfo');
const booksDetailInfo = require('../../model/booksDetailInfo');
const booksController = require('../crawlertodb/booksController');
//过滤的字段
const _filter = {
    _id: 0,
    __v: 0,
};

class Bookcontroller {

    constructor() {
    }

    /**
     * 全部分类
     * @param req
     * @param res
     * @param next
     */
    getClassify(req, res, next) {
        classifyInfo.findOne({}, _filter, (err, data) => {
            let result = '查询出错';
            if (err) {
                console.log(err);
            } else {
                if (data.length === 0) {
                    result = '查不到分类';
                } else {
                    result = data;
                }
            }

            res.json({
                code: constant.RESULT_CODE.SUCCESS.code,
                msg: constant.RESULT_CODE.SUCCESS.msg,
                data: result
            });
        });
    }

    /**
     * 分类详情
     * @param req
     * @param res
     * @param next
     */
    getClassifyDetail(req, res, next) {
        let getder = req.query.gender;
        let type = req.query.type;
        let major = req.query.major;
        let page = parseInt(req.query.page);

        let sortType = {latelyFollower: 1};

        console.log('major' + major);
        console.log('page' + page);
        console.log('type' + type);

        if (/*getder == null || type == null ||*/ major == null) {
            let result = '参数错误';
            // if (getder == null) {
            //     result = 'getder参数不能为空';
            // }
            // if (type == null) {
            //     result = 'type参数不能为空';
            // }
            if (major == null) {
                result = 'major参数不能为空';
            }

            res.json({
                code: constant.RESULT_CODE.ARG_ERROR.code,
                msg: constant.RESULT_CODE.ARG_ERROR.msg,
                data: result
            });
            return;
        }

        switch (type) {
            case 'hot':
                sortType = {latelyFollower: -1};
                break
            case 'new':
                sortType = {updated: -1};
                break
            case 'reputation':
                sortType = {retentionRatio: -1};
                break
            case 'over':
                sortType = {latelyFollower: -1};
                break
        }

        booksDetailInfo.find({}, {__v: 0})
            .where('majorCate').equals(major)
            .skip(page == 1 ? 0 : page * 10)
            .limit(10)
            .sort(sortType)
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        code: constant.RESULT_CODE.NO_DATA.code,
                        msg: constant.RESULT_CODE.NO_DATA.msg,
                        data: '暂无书籍信息'
                    });
                    return;
                }

                res.json({
                    code: constant.RESULT_CODE.SUCCESS.code,
                    msg: constant.RESULT_CODE.SUCCESS.msg,
                    data: data
                });

            })

    }


    /**
     * 测试
     * @param req
     * @param res
     * @param next
     */
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
                data: msg
            });

        });

    }

}


module.exports = new Bookcontroller();