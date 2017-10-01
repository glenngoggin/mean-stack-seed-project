const User = require('../models/user.model');
const i18n = require("i18n");

function listUsers(req, res, next) {
  User.listUsers(req.query.skip, req.query.limit)
    .then(function (users) {
      res.success.OK('OK', users);
    })
    .catch(function (err) {
      next(err);
    });
}

function getUser(req, res, next) {

  User.getUser(req.params.userId)
    .then(function (user) {
      res.success.OK('OK', user);
    })
    .catch(function (err) {
      next(err);
    });
}

function createUser(req, res, next) {

  User.createUser(req.body)
    .then(function (author) {
      res.success.OK(i18n.__('users_controller_create_user_success'), author);
    })
    .catch(function (err) {
      next(err);
    });
}

function bulkCreateUsers(req, res, next) {

  User.insertMany(req.body)
    .then(function (users) {
      res.success.OK(i18n.__('users_controller_bulk_create_user_success'), users);
    })
    .catch(function (err) {
      next(err);
    });

}

function updateUser(req, res, next) {
  User.updateUser(req.params.userId, req.body)
    .then(function (user) {
      res.success.OK(i18n.__('users_controller_update_user_success'), user);
    })
    .catch(function (err) {
      next(err);
    });
}

function deleteUser(req, res, next) {
  User.deleteUser(req.params.userId)
    .then(function (user) {
      res.success.OK(i18n.__('users_controller_delete_user_success'), user);
    })
    .catch(function (err) {
      next(err);
    });
}

function deleteAllUsers(req, res, next) {
  User.deleteAllUsers()
    .then(function (user) {
      res.success.OK('OK', user);
    })
    .catch(function (err) {
      next(err);
    });
}


module.exports = {
  listUsers: listUsers,
  getUser: getUser,
  createUser: createUser,
  bulkCreateUsers: bulkCreateUsers,
  updateUser: updateUser,
  deleteUser: deleteUser,
  deleteAllUsers: deleteAllUsers
};