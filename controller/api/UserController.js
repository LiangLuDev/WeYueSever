const userInfo = require('../../model/userInfo');
const constant = require("../../utils/constant");

const _filter = {
    __v: 0,
};


class UserController {

    constructor() {
    }

    /**
     * 用户注册
     * @param req
     * @param res
     * @param next
     */
    userRegister(req, res, next) {
        let name = req.query.name;
        let password = req.query.password;
        userInfo
            .findOne({name: name}, _filter)
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (data != null) {
                    console.log('用户已经注册，请直接登录');
                    res.json({
                        code: constant.RESULT_CODE.SUCCESS.code,
                        msg: constant.RESULT_CODE.SUCCESS.msg,
                        data: '用户已经注册，请直接登录'
                    });
                    return;
                }
                let user = {};
                user.name = name;
                user.password = password;
                user.icon = '/default_icon.png';
                user.brief = 'To be, or not to be: that is the question.';
                userInfo.create(user, (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('注册失败');
                        return
                    }
                    console.log(result);
                    console.log('注册成功');
                    res.json({
                        code: constant.RESULT_CODE.SUCCESS.code,
                        msg: constant.RESULT_CODE.SUCCESS.msg,
                        data: '注册成功'
                    });
                })


            });
    }

    /**
     * 用户登录
     * @param req
     * @param res
     * @param next
     */
    userLogin(req, res, next) {
        let name = req.query.name;
        let password = req.query.password;
        userInfo
            .findOne({name: name}, _filter)
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (data == null) {
                    console.log('此用户没有注册');
                    res.json({
                        code: constant.RESULT_CODE.NO_DATA.code,
                        msg: constant.RESULT_CODE.NO_DATA.msg,
                        data: '此用户没有注册'
                    });
                    return;
                }

                if (data.password == password) {
                    res.json({
                        code: constant.RESULT_CODE.SUCCESS.code,
                        msg: constant.RESULT_CODE.SUCCESS.msg,
                        data: data
                    });
                } else {
                    res.json({
                        code: constant.RESULT_CODE.SUCCESS.code,
                        msg: constant.RESULT_CODE.SUCCESS.msg,
                        data: '密码错误'
                    });
                }
            });

    }
}


module.exports = new UserController();