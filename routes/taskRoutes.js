const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('./../controllers/authController');

// new Router for tasks
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(authController.restrictTo('user'));

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.setUserId, taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
