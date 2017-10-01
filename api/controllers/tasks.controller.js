const Task = require('../models/task.model');
const i18n = require("i18n");


function listTasks(req, res, next) {
  Task.listTasks(req.query.skip,req.query.limit)
    .then(function (tasks) { 
      res.success.OK('OK', tasks);
    })
    .catch(function (err) {
      next(err);
    });
}

function getTask(req, res,next) {

  Task.getTask(req.params.taskId)
    .then(function(task) {
      res.success.OK('OK', task);
    })
    .catch(function(err) {
      next(err);
    });
}

function createTask(req, res,next) {
  Task.createTask(req.body)
    .then(function(task) {
      res.success.OK(i18n.__('tasks_controller_create_task_success'), task);
    })
    .catch(function(err) {
      next(err);
    });
}

function updateTask(req, res,next) {
  Task.updateTask(req.params.taskId,req.body)
    .then(function(task) {
      res.success.OK(i18n.__('tasks_controller_update_task_success'), task);
    })
    .catch(function(err) {
      next(err);
    });
}

function deleteTask(req, res, next) {
  Task.deleteTask(req.params.taskId)
  .then(function(task) {
    res.success.OK(i18n.__('tasks_controller_delete_task_success'), task);
  })
  .catch(function(err) {
    next(err);
  });
}

function deleteAllTasks(req, res, next) {
  Task.deleteAllTasks()
  .then(function(tasks) {
    res.success.OK('OK', tasks);
  })
  .catch(function(err) {
    next(err);
  });
}


module.exports = {
  listTasks:listTasks,
  getTask:getTask,
  createTask:createTask,
  updateTask:updateTask,
  deleteTask:deleteTask,
  deleteAllTasks:deleteAllTasks
};

