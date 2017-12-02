const express = require('express');
const router = express.Router();
const bookController = require('../controller/api/BookController');


router.get('/book', bookController.getClassify);
router.get('/addbook', bookController.addBook);

module.exports = router;