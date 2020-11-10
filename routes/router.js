const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.all("/API/SandboxLab", controller.SandboxLab);

router.get("/API/GetWebsites", controller.GetWebsites);

router.get("/API/GetImages", controller.GetImages);

router.post("/API/SendImage", controller.SendImage);

router.post("/API/SendWebsite", controller.SendWebsite);

router.post("/API/Login", controller.Login);

router.post("/API/Register", controller.Register);

module.exports = router;