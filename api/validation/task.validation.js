const Joi = require('joi');


module.exports = {
    // GET /tasks/:taskId
    getTask: {
        params: {
          taskId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
        }
    },

  // POST /tasks
  createTask: {
    body: {
      description: Joi.string().required(),
      status: Joi.string().required()
    }
  },

  // UPDATE /tasks/:taskId
  updateTask: {
    body: {
      description: Joi.string().required(),
      status: Joi.string().required()
    },
    params: {
      taskId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },

   // DELETE /tasks/:taskId
   deleteTask: {
    params: {
      taskId: Joi.string().hex().regex(/^[0-9a-fA-F]{24}$/).required()
    }
}

};