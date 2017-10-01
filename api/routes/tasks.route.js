const express = require('express');
const router = express.Router(); 
const validate = require('express-validation');
const endpointValidation = require('../validation/task.validation');
var TaskCtrl = require('../controllers/tasks.controller');

router.route('/')
    .get(TaskCtrl.listTasks)
    .post(validate(endpointValidation.createTask),TaskCtrl.createTask)
    .delete(TaskCtrl.deleteAllTasks);

router.route('/:taskId')
    .get(validate(endpointValidation.getTask),TaskCtrl.getTask)
    .put(validate(endpointValidation.updateTask),TaskCtrl.updateTask)
    .delete(validate(endpointValidation.deleteTask),TaskCtrl.deleteTask);

module.exports = router;
