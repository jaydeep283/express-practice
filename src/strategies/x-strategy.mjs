import passport from "passport";
import { Strategy } from "passport-twitter";
import { XUser } from "../mongoose/schemas/x-user.mjs";

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`);
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(`Inside Desirialize User`);
    console.log(`Deserializing User ID: ${id}`);
    try {
        const userFound = await XUser.findById(id);
        if (!userFound) {
            throw new Error("User not found!");
        }
        done(null, userFound);
    } catch (error) {
        done(error, null);
    }
});

export default passport.use(
    new Strategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: "http://localhost:3000/api/auth/x/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            let userFound;
            try {
                userFound = await XUser.findOne({ xId: profile.id });
                console.log(userFound);
            } catch (error) {
                done(error, null);
            }

            try {
                if (!userFound) {
                    const newUser = new XUser({
                        username: profile.username,
                        displayName: profile.displayName,
                        xId: profile.id,
                    });
                    const newSavedUser = await newUser.save();
                    return done(null, newSavedUser);
                }
                return done(null, userFound);
            } catch (error) {
                console.log(error);
                done(error, null);
            }
        }
    )
);
