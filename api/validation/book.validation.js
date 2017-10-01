const Joi = require('joi');


module.exports = {
    // GET /book/:bookId
    getBook: {
        params: {
          bookId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
        }
    },

  // POST /books
  createBook: {
    body: {
        title: Joi.string().required(),
        price: Joi.string().required(),
        authors: Joi.array().required(),
    }
  },

  // UPDATE /book/:bookId
  updateBook: {
    body: {
        title: Joi.string().required(),
        price: Joi.string().required(),
        authors: Joi.array().required(),
    },
    params: {
      bookId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },

   // DELETE /book/:bookId
   deleteBook: {
    params: {
      bookId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
},

 

};