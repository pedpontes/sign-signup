const { User } = require("../schema/schema");

const profile = async (req, res) => {
    const _id = req.user;

    const user = await User.findById(_id);
    res.status(200).json(user);
}

module.exports = { profile };