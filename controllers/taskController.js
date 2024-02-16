const Task = require('../models/taskModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllTasks = catchAsync(async (req, res, next) => {
  // Get all tasks for a specific user
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks
    }
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  // Get a specific task for a specific user
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return next(
      new AppError('No task found with that ID for the specified user', 404)
    );
  }

  res.status(200).json({ task });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const newTask = await Task.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      task: newTask
    }
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }
  if (task.user.toString() !== req.user.id.toString()) {
    //console.log(task.user.toString(), req.user.id.toString());
    return next(new AppError('You are not allowed to update this task', 403));
  }
  const doc = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }
  if (task.user.toString() !== req.user.id.toString()) {
    return next(new AppError('You are not allowed to update this task', 403));
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
