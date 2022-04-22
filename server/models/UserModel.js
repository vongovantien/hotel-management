const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
