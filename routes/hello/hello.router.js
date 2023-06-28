const { Router } = require("express");
const helloRouter = Router();

const helloController = require("./hello.controller.js");

helloRouter.get("/", helloController.sayHello);

module.exports = helloRouter;