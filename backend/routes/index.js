const express = require('express');
const { userRouter } = require('./user');
const { accountRouter } = require('./accounts');

const rootRouter = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/account', accountRouter);

module.exports = {
  rootRouter
};
