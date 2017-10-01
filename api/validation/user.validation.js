const Joi = require('joi');


module.exports = {
    // GET /users/:userId
    getUser: {
        params: {
          userId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
        }
    },

  // POST /users
  createUser: {
    body: {
        name: Joi.string().required()
    }
  },

   // POST /users/bulk
   
   bulkCreateUsers: {
    body: {
        name: Joi.string().required()
    }
  },

  // UPDATE /user/:userId
  updateUser: {
    body: {
        name: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },

   // DELETE /users/:userId
   deleteUser: {
    params: {
      userId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
},

 

};