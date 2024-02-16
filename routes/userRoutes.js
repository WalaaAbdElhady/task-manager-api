const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get(
  '/me',
  authController.restrictTo('user'),
  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMe',
  authController.restrictTo('user'),
  userController.updateMe
);
router.delete(
  '/deleteMe',
  authController.restrictTo('user'),
  userController.deleteMe
);

router.delete(
  '/delete-account',
  authController.restrictTo('user'),
  userController.deleteAccount
);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers)
  .post(authController.restrictTo('admin'), userController.createUser);

router
  .route('/:id')
  .get(authController.restrictTo('admin'), userController.getUser)
  .patch(authController.restrictTo('admin'), userController.UpdateUser)
  .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
