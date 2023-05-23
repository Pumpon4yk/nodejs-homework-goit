const express = require("express");

const controller = require('../../controller/auth');
const { validateBody, authValidToken } = require('../../middlewares');
const {schemasUsers} = require ('../../schemas');

const router = express.Router();

router.post("/users/register", validateBody(schemasUsers.register), controller.register);

router.post("/users/login", validateBody(schemasUsers.login), controller.login);

router.post("/users/logout", authValidToken, controller.logout);

router.get("/users/current", authValidToken, controller.current);

router.patch("/users", authValidToken, validateBody(schemasUsers.subscription), controller.subscription);

module.exports = router;