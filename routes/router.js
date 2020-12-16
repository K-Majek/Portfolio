const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.all("/API/SandboxLab", controller.SandboxLab);

router.get("/API/GetWebsites", controller.GetWebsites);

router.get("/API/GetImages", controller.GetImages);

router.post("/API/SendWebsite", controller.SendContent);

router.post("/API/SendImage", controller.SendContent);

router.post("/API/Login", controller.Login);

router.post("/API/Register", controller.Register);

router.put("/API/UpdateContent", controller.UpdateContent);

module.exports = router;