const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Mongo conected...")
    } catch (error) {
        console.log("Mongo connection error!")
    }
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    pass: { type: String, required: true },
    verify: { type: Boolean, default: false },
    date: { type: String, required: true }
})
const User = mongoose.model("User", userSchema);

module.exports = { mongoConnect, User };