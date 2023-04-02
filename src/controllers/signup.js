const { User } = require("../schema/schema");
const { sendMailer } = require("../nodemailer/sendmail");
const bcrypt = require("bcryptjs");

const verifyEmail = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).redirect("/login"); //error message from not exist account
    if (user.verify) return res.status(404).send({ error: -2 }); //error message from already verified account

    user.verify = true;
    await user.save();

    return res.status(200).redirect("/login"); //success message from verify account
}

const cadastro = async (req, res) => {
    const { email, username, pass } = req.body;

    const existUser = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (existUser) return res.send("User not exist"); //error message from exist account

    const date = new Date();
    const newUser = await new User({
        email: email,
        username: username,
        pass: bcrypt.hashSync(pass),
        date: date.toString()
    }).save();

    sendMailer({
        to: newUser.email,
        subject: "Verifying account with email - Company",
        text: `Hello ${newUser.username},\n\nPlease verify your account by clicking the link below:\n\nhttp://localhost:3000/verify/${newUser._id}`
    });
    return res.status(201).send("Sucess add account"); //success message from add account
}




module.exports = { cadastro, verifyEmail };