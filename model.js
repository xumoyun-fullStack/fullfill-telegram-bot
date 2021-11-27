const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        uniqure: true
    },
    step: {
        type: String,
        required: true,
        default: 0
    },
    name: {
        type: String,
    },
    phone_number: {
        type: String,

    },
})

module.exports = mongoose.model("users", UserSchema);