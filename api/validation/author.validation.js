const Joi = require('joi');


module.exports = {
    // GET /authors/:authorId
    getAuthor: {
        params: {
          authorId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
        }
    },

  // POST /authors
  createAuthor: {
    body: {
        name: Joi.string().required()
    }
  },

   // POST /authors/bulk
   
   bulkCreateAuthors: {
    body: {
        name: Joi.string().required()
    }
  },

  // UPDATE /authors/:authorId
  updateAuthor: {
    body: {
        name: Joi.string().required()
    },
    params: {
      authorId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },

   // DELETE /authors/:authorId
   deleteAuthor: {
    params: {
      authorId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
},

 

};