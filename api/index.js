const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postRouter = require('./post');
apiRouter.use('/posts', postRouter);

module.exports = apiRouter;