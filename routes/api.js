const express = require('express');
const router = express.Router();
const bookController = require('../controller/api/BookController');

/*book模块*/
router.get('/book/classify', bookController.getClassify);
router.get('/book/classify/detail', bookController.getClassifyDetail);

module.exports = router;