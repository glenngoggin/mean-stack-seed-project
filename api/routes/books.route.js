const express = require('express');
const router = express.Router(); 
const validate = require('express-validation');
const endpointValidation = require('../validation/book.validation');
var BookCtrl = require('../controllers/books.controller');

router.route('/')
    .get(BookCtrl.listBooks)
    .post(validate(endpointValidation.createBook),BookCtrl.createBook)
    .delete(BookCtrl.deleteAllBooks);

router.route('/:bookId')
    .get(validate(endpointValidation.getBook),BookCtrl.getBook)
    .put(validate(endpointValidation.updateBook),BookCtrl.updateBook)
    .delete(validate(endpointValidation.deleteBook),BookCtrl.deleteBook);

module.exports = router;
