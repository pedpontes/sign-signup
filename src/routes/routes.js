const router = require("express").Router();
const { cadastro, verifyEmail } = require("../controllers/signup");
const { login, validToken } = require("../controllers/sign");
const { profile } = require("../controllers/profile");

router.post("/cadastro", cadastro);

router.get("/verify/:id", verifyEmail);

router.post("/login", login);

router.get("/profile", validToken, profile)

module.exports = router;