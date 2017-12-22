const express = require('express');
const router = express.Router();
const constant = require('../../utils/constant');
const classifyInfo = require('../../model/bookClassifyInfo');
const booksInfo = require('../../model/booksInfo');
const booksDetailInfo = require('../../model/booksDetailInfo');
const bookChaptersController = require('../crawlertodb/bookChaptersController');
//过滤的字段
const _filter = {
    // _id: 0,
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

        res.json({
            code: constant.RESULT_CODE.SUCCESS.code,
            msg: constant.RESULT_CODE.SUCCESS.msg,
            data: constant.BOOK_CLASSIFY
        });
    }

    /**
     * 分类详情
     * @param req
     * @param res
     * @param next
     */
    getBookList(req, res, next) {
        let type = req.query.type == null ? 'hot' : req.query.type;
        let major = req.query.major == null ? '玄幻' : req.query.major;
        let page = req.query.page == null ? 1 : req.query.page;


        let sortType /*= {latelyFollower: -1}*/;
        //
        // if (type == null || major == null) {
        //     let result = '参数错误';
        //     if (type == null) {
        //         result = 'type参数不能为空';
        //     }
        //     if (major == null) {
        //         result = 'major参数不能为空';
        //     }
        //
        //     res.json({
        //         code: constant.RESULT_CODE.ARG_ERROR.code,
        //         msg: constant.RESULT_CODE.ARG_ERROR.msg,
        //         data: result
        //     });
        //     return;
        // }

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
        }


        let find = booksDetailInfo.find({}, {__v: 0});
        find.where('majorCate').equals(major)
        find.skip(page == 1 ? 0 : page * 10)
        find.limit(10)
        find.sort(sortType)
        find.exec((err, data) => {
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
     * 根据id获取书籍信息
     * @param req
     * @param res
     * @param next
     */

    getBookById(req, res, next) {
        let id = req.params.id;
        if (id == null) {
            res.json({
                code: constant.RESULT_CODE.ARG_ERROR.code,
                msg: constant.RESULT_CODE.ARG_ERROR.msg,
                data: 'id参数不能为空'
            });

            return;
        }

        booksDetailInfo.findOne({_id: id}, _filter, (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    code: constant.RESULT_CODE.NO_DATA.code,
                    msg: constant.RESULT_CODE.NO_DATA.msg,
                    data: '查不到此书籍信息'
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
     * 根据tag获取书籍信息
     * @param req
     * @param res
     * @param next
     */
    getBookListByTag(req, res, next) {
        let bookTag = req.params.bookTag;
        let page = req.query.page;
        if (bookTag == null) {
            res.json({
                code: constant.RESULT_CODE.ARG_ERROR.code,
                msg: constant.RESULT_CODE.ARG_ERROR.msg,
                data: 'bookTag参数不能为空'
            });
            return;
        }

        //tags数组包含其中的元素的数据
        booksDetailInfo.find({tags: {$in: [bookTag]}}, _filter)
            .skip(page == 1 ? 0 : page * 10)
            .sort({retentionRatio: -1})
            .limit(10)
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        code: constant.RESULT_CODE.NO_DATA.code,
                        msg: constant.RESULT_CODE.NO_DATA.msg,
                        data: '查不到此书籍信息'
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
     * 获取书籍章节信息
     * @param req
     * @param res
     * @param next
     */


    getBookChapters(req, res, next) {
        let id = req.params.bookId;
        if (id == null) {
            res.json({
                code: constant.RESULT_CODE.ARG_ERROR.code,
                msg: constant.RESULT_CODE.ARG_ERROR.msg,
                data: 'id参数不能为空'
            });

            return;
        }
        bookChaptersController.findBookChaptersById(id, (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    code: constant.RESULT_CODE.NO_DATA.code,
                    msg: constant.RESULT_CODE.NO_DATA.msg,
                    data: '查不到此书籍信息'
                });
                return;
            }

            if (data == null) {
                res.json({
                    code: constant.RESULT_CODE.NO_DATA.code,
                    msg: constant.RESULT_CODE.NO_DATA.msg,
                    data: '查不到此书籍信息'
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
     * 获取搜索书籍信息
     * @param req
     * @param res
     * @param next
     */
    getBookSearch(req, res, next) {
        let keyword = req.query.keyword;

        if (keyword == null) {
            res.json({
                code: constant.RESULT_CODE.ARG_ERROR.code,
                msg: constant.RESULT_CODE.ARG_ERROR.msg,
                data: 'keyword参数不能为空'
            });
            return;
        }

        console.log('keyword===' + keyword);
        booksDetailInfo.find({}, _filter)
        //多条件，数组
            .or([{title: {$regex: keyword}}, {author: {$regex: keyword}}])
            .limit(10)
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        code: constant.RESULT_CODE.NO_DATA.code,
                        msg: constant.RESULT_CODE.NO_DATA.msg,
                        data: '查不到此书籍信息'
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


}


module.exports = new Bookcontroller();