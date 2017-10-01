const express = require('express');
const router = express.Router(); 
const validate = require('express-validation');
const endpointValidation = require('../validation/user.validation');
var UserCtrl = require('../controllers/users.controller');

router.route('/')
    .get(UserCtrl.listUsers)
    .post(validate(endpointValidation.createUser),UserCtrl.createUser)
    .delete(UserCtrl.deleteAllUsers);

    // FIXME:  Must add in validation for bulk create.
router.route('/bulk')
    .post(UserCtrl.bulkCreateUsers);
    
router.route('/:userId')
    .get(validate(endpointValidation.getUser),UserCtrl.getUser)
    .put(validate(endpointValidation.updateUser),UserCtrl.updateUser)
    .delete(validate(endpointValidation.deleteUser),UserCtrl.deleteUser);

module.exports = router;
