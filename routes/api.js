const express = require('express');
const router = express.Router();
const bookController = require('../controller/api/BookClassifyController');
const userController = require('../controller/api/UserController');
const constant = require("../utils/constant");
const jwt = require('jsonwebtoken'); // 使用jwt签名


/*user模块*/
router.post('/user/register', userController.userRegister);
router.get('/user/login', userController.userLogin);


router.use(function (req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    let token = req.body.token || req.query.token || req.headers['access-token'];
    console.log('token' + token);
    if (token) {
        jwt.verify(token, 'wyjwtsecret', (err, decoded) => {
            if (err) {
                console.log('err' + err);
                res.json({
                    code: constant.RESULT_CODE.TOKEN_ERR.code,
                    msg: constant.RESULT_CODE.TOKEN_ERR.msg,
                    data: {}
                });
            } else {
                req.decoded = decoded;
                console.log(decoded);
                next();//继续下一步路由

            }
        })
    } else {
        res.json({
            code: constant.RESULT_CODE.TOKEN_NO_FIND.code,
            msg: constant.RESULT_CODE.TOKEN_NO_FIND.msg,
            data: {}
        });
    }
})

/**
 * 用户模块
 */
router.post('/user/uploadavatar', userController.userUploadAvatar);
router.put('/user/password', userController.updatePassword);
router.put('/user/userinfo', userController.updateUserInfo);
// router.get('/user/userinfo', userController.userinfo);


/*book模块*/
router.get('/books', bookController.getBookList);
router.get('/books/:bookId', bookController.getBookById);
router.get('/books/:bookId/chapters', bookController.getBookChapters);
router.get('/books/tag/:bookTag', bookController.getBookListByTag);
router.get('/classify', bookController.getClassify);
router.get('/search', bookController.getBookSearch);


module.exports = router;