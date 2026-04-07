const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,

    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


userSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

userSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());

    if (doc) {
        await this.model.updateOne(
            { _id: doc._id },
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
    }

    this.setQuery({ _id: null });

    next();
});

module.exports = mongoose.model("User", userSchema);