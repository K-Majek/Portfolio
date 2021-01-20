const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.all("/API/SandboxLab", controller.SandboxLab);

router.get("/API/GetContent", controller.GetContent);

router.post("/API/SendContent", controller.SendContent);

router.post("/API/Login", controller.Login);

router.post("/API/Register", controller.Register);

router.put("/API/UpdateContent", controller.UpdateContent);

module.exports = router;