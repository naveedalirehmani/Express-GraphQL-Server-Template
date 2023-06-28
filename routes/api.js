const { Router } = require('express');
const Api1 = Router();

const helloRouter = require('./hello/hello.router.js');

Api1.use('/hello', helloRouter);

module.exports = Api1;
