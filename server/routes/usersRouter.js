const Router = require("express");
const usersController = require("../controllers/usersController");
const router = new Router();
const authMiddleware = require("../middlwaere/authMiddlware");

router.post("/registration", usersController.registration);
router.post("/login", usersController.login);
router.get("/auth", authMiddleware, usersController.check);

router.delete("/");

module.exports = router;
