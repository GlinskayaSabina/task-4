const Router = require("express");
const usersController = require("../controllers/usersController");
const router = new Router();
const authMiddleware = require("../middlwaere/authMiddlware");

router.post("/registration", usersController.registration);
router.post("/login", usersController.login);
router.get("/auth", authMiddleware, usersController.check);
router.post("/delete", authMiddleware, usersController.delete);
router.patch("/changeStatus", authMiddleware, usersController.block);

router.get("/home", usersController.home);

module.exports = router;
