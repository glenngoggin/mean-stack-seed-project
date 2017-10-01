const Author = require('../models/author.model');
const i18n = require("i18n");

function listAuthors(req, res, next) {
  Author.listAuthors(req.query.skip, req.query.limit)
    .then(function (authors) {
      res.success.OK('OK', authors);
    })
    .catch(function (err) {
      next(err);
    });
}

function getAuthor(req, res, next) {

  Author.getAuthor(req.params.authorId)
    .then(function (author) {
      res.success.OK('OK', author);
    })
    .catch(function (err) {
      next(err);
    });
}

function createAuthor(req, res, next) {

  Author.createAuthor(req.body)
    .then(function (author) {
      res.success.OK(i18n.__('authors_controller_create_author_success'), author);
    })
    .catch(function (err) {
      next(err);
    });
}

function bulkCreateAuthors(req, res, next) {

  Author.insertMany(req.body)
    .then(function (authors) {
      res.success.OK(i18n.__('authors_controller_bulk_create_author_success'), authors);
    })
    .catch(function (err) {
      next(err);
    });

}

function updateAuthor(req, res, next) {
  Author.updateAuthor(req.params.authorId, req.body)
    .then(function (author) {
      res.success.OK(i18n.__('authors_controller_update_author_success'), author);
    })
    .catch(function (err) {
      next(err);
    });
}

function deleteAuthor(req, res, next) {
  Author.deleteAuthor(req.params.authorId)
    .then(function (author) {
      res.success.OK(i18n.__('authors_controller_delete_author_success'), author);
    })
    .catch(function (err) {
      next(err);
    });
}

function deleteAllAuthors(req, res, next) {
  Author.deleteAllAuthors()
    .then(function (author) {
      res.success.OK('OK', author);
    })
    .catch(function (err) {
      next(err);
    });
}


module.exports = {
  listAuthors: listAuthors,
  getAuthor: getAuthor,
  createAuthor: createAuthor,
  bulkCreateAuthors: bulkCreateAuthors,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
  deleteAllAuthors: deleteAllAuthors
};