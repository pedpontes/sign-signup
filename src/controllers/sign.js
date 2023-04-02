const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./configSecret.json")
const { User } = require("../schema/schema");

const validToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(404).redirect("/login");

    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    next();
}

const login = async (req, res) => {
    const { email, pass } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send("User not found");

    const isUser = bcrypt.compareSync(pass, user.pass);

    if (!isUser) return res.status(404).send("Wrong password");

    const token = jwt.sign({
        _id: user._id,
        email: user.email
    },
        config.secret, {
        expiresIn: 86400
    });

    res.status(200).header("Authorization", token).redirect("/");
}

module.exports = { login, validToken };