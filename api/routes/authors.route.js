const express = require('express');
const router = express.Router(); 
const validate = require('express-validation');
const endpointValidation = require('../validation/author.validation');
var AuthorCtrl = require('../controllers/authors.controller');

router.route('/')
    .get(AuthorCtrl.listAuthors)
    .post(validate(endpointValidation.createAuthor),AuthorCtrl.createAuthor)
    .delete(AuthorCtrl.deleteAllAuthors);

    // FIXME:  Must add in validation for bulk create.
router.route('/bulk')
    .post(AuthorCtrl.bulkCreateAuthors);
    
router.route('/:authorId')
    .get(validate(endpointValidation.getAuthor),AuthorCtrl.getAuthor)
    .put(validate(endpointValidation.updateAuthor),AuthorCtrl.updateAuthor)
    .delete(validate(endpointValidation.deleteAuthor),AuthorCtrl.deleteAuthor);

module.exports = router;
