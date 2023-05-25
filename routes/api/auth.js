const express = require("express");

const controller = require('../../controller/auth');
const { validateBody, authValidToken, upload } = require('../../middlewares');
const {schemasUsers} = require ('../../schemas');

const router = express.Router();

router.post("/users/register", validateBody(schemasUsers.register), controller.register);

router.post("/users/login", validateBody(schemasUsers.login), controller.login);

router.post("/users/logout", authValidToken, controller.logout);

router.get("/users/current", authValidToken, controller.current);

router.patch("/users", authValidToken, validateBody(schemasUsers.subscription), controller.subscription);

router.patch("/users/avatars", authValidToken, upload.single('avatar'), controller.changeAvatar); 

module.exports = router;