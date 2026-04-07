const otpStore = new Map();

const saveOTP = (userId, otp) => {
    otpStore.set(userId, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000 
    });
};

const verifyOTP = (userId, otp) => {
    const data = otpStore.get(userId);

    if (!data) return false;
    if (Date.now() > data.expiresAt) return false;
    if (data.otp !== otp) return false;

    otpStore.delete(userId); 
    return true;
};

module.exports = { saveOTP, verifyOTP };