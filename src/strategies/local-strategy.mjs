import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`);
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(`Inside Desirialize User`);
    console.log(`Deserializing User ID: ${id}`);
    try {
        const userFound = await User.findById(id);
        if (!userFound) {
            throw new Error("User not found!");
        }
        done(null, userFound);
    } catch (error) {
        done(error, null);
    }
});

export default passport.use(
    new Strategy(async (username, password, done) => {
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        try {
            const userFound = await User.findOne({ username });
            console.log(userFound);
            if (!userFound) {
                throw new Error("User not found!");
            }
            if (!comparePassword(password, userFound.password)) {
                throw new Error("Invalid credentials");
            }
            done(null, userFound);
        } catch (error) {
            done(error, null);
        }
    })
);
