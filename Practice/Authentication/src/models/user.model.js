import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    isVerified: {type: Boolean, default: false, required: true},
    verificationToken: {
        type: String,
    },

    resetTokenExpiry: {
        type: Date,
    },
    resetToken: {
        type: String,
    },

    role: [{type: String, enum: ['user', 'admin'], default: 'user'}]
},{
    timestamps: true
});

export const User = mongoose.model('User', UserSchema);