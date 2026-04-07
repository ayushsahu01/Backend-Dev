const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,

    lastLogin: Date,
    lastLogout: Date,
    lastActive: Date
}, { timestamps: true });

userSchema.pre("save", function (next) {
    this.lastActive = new Date();
    next();
});

userSchema.pre("findOneAndUpdate", function (next) {
    this.set({ lastActive: new Date() });
    next();
});

userSchema.methods.recordLogin = function () {
    this.lastLogin = new Date();
    this.lastActive = new Date();
    return this.save();
};

userSchema.methods.recordLogout = function () {
    this.lastLogout = new Date();
    return this.save();
};

module.exports = mongoose.model("User", userSchema);