const express = require('express');
const router = express.Router();
const bookController = require('../controller/api/BookClassifyController');

/*book模块*/
router.get('/books', bookController.getBookList);
router.get('/books/:bookId', bookController.getBookById);
router.get('/books/:bookId/chapters', bookController.getBookChapters);
router.get('/books/tag/:bookTag', bookController.getBookListByTag);
router.get('/classify', bookController.getClassify);
router.get('/search', bookController.getBookSearch);

module.exports = router;