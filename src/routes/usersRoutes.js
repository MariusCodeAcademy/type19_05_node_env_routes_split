const express = require('express');

const usersRouter = express.Router();

const userController = require('../controllers/userController');

// Routes
// GET /api/users - grazina visus vartotojus
usersRouter.get('/api/users', userController.getAll);

usersRouter.get('/api/users/:userId', userController.getSingle);

module.exports = usersRouter;
