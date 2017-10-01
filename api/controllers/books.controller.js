const Book = require('../models/book.model');
const Author = require('../models/author.model');
const i18n = require("i18n");

function listBooks(req, res, next) {
  Book.listBooks(req.query.skip,req.query.limit)
    .then(function (books) { 
      res.success.OK('OK', books);
    })
    .catch(function (err) {
      next(err);
    });
}

function getBook(req, res,next) {

  Book.getBook(req.params.bookId)
    .then(function(book) {
      res.success.OK('OK', book);
    })
    .catch(function(err) {
      next(err);
    });
}

function createBook(req, res,next) {
  Book.createBook(req.body)
    .then(function(book) {
      res.success.OK(i18n.__('books_controller_create_book_success'), book);
    })
    .catch(function(err) {
      next(err);
    });
}

function updateBook(req, res,next) {
  Book.updateBook(req.params.bookId,req.body)
    .then(function(book) {
      res.success.OK(i18n.__('books_controller_update_book_success'), book);
    })
    .catch(function(err) {
      next(err);
    });
}

function deleteBook(req, res, next) {
  Book.deleteBook(req.params.bookId)
  .then(function(book) {
    res.success.OK(i18n.__('books_controller_delete_book_success'), book);
  })
  .catch(function(err) {
    next(err);
  });
}

function deleteAllBooks(req, res, next) {
  Book.deleteAllBooks()
  .then(function(books) {
    res.success.OK('OK', books);
  })
  .catch(function(err) {
    next(err);
  });
}


module.exports = {
  listBooks:listBooks,
  getBook:getBook,
  createBook:createBook,
  updateBook:updateBook,
  deleteBook:deleteBook,
  deleteAllBooks:deleteAllBooks
};

