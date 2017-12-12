const express = require('express');
const router = express.Router();
const bookController = require('../controller/api/BookClassifyController');

/*book模块*/
router.get('/book/classify', bookController.getClassify);
router.get('/book', bookController.getBookList);
router.get('/book/:id', bookController.getBookById);
router.get('/book/:bookId/chapters', bookController.getBookChapters);

module.exports = router;