import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import user from "../models/user.model.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async(accessToken, refreshToken, profile, done) => {
    try{
        const user = await user.findOne({ googleId: profile.id });
        if(!user){
            const email = profile.emails[0].value;
            user = await user.findOne({ email });
            if(user){
                user.googleId = profile.id;
                user.isVerified = true;
                await user.save();
                return done(null, user);
            }else{
            user = await user.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                isVerified: true
            });
            return done(null, user);
        }
    }
    }catch(error){
        return done(error, null);
    }
}))