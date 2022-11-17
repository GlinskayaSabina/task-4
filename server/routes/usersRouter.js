const Router = require("express");
const usersController = require("../controllers/usersController");
const router = new Router();

router.post("/registration", usersController.registration);
router.post("/login", usersController.login);
router.get("/auth", usersController.check);

router.delete("/");

module.exports = router;
