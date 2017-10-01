const express = require('express');
const router = express.Router();

var bookRoutes = require('./books.route');
var authorRoutes = require('./authors.route');
var taskRoutes = require('./tasks.route');
var userRoutes = require('./users.route');

router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount routes
router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
module.exports = router;
