import express, { application } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { User } from "./mongoose/schemas/user.mjs";
import { mockUsers } from "./utils/constants.mjs";
import "./strategies/local-strategy.mjs";

const PORT = process.env.PORT || 8080;

const app = express();

mongoose
    .connect(
        // "mongodb://root:password@localhost:27017/express_practice?authSource=admin"
        process.env.MONGO_URI.toString()
    )
    .then(() => console.log("Database connected successfully!"))
    .catch((error) => console.log(`Error: ${error}`));

app.use(express.json());
app.use(cookieParser("secret"));
app.use(
    session({
        secret: "genesis patil",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    // console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    req.session.myvar = "This is hit > 1";
    // res.cookie("hello", "world", { maxAge: 30000, signed: true });
    res.send("Hello World.");
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
    // console.log(req.session);
    // console.log(req.session.id);
    // const {
    //     body: { username, password },
    // } = req;
    // const userFound = mockUsers.find((user) => user.username === username);
    // if (userFound && userFound.password === password) {
    //     req.session.user = userFound;
    //     return res.status(200).send(userFound);
    // }
    // return res.status(401).send({ msg: "Bad Credentials!" });

    // ** With passport library **
    console.log(req.session);
    res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
    // req.sessionStore.get(req.sessionID, (err, session) => {
    //     console.log(session);
    // });
    // return req.session.user
    //     ? res.status(200).send(req.session.user)
    //     : res.status(401).send({ msg: "Not Authenticated" });

    // ** For passport implementation **
    console.log(`Inside /api/auth/status endpoint`);
    console.log(req.user);
    console.log(req.session);
    return req.user ? res.status(200).send(req.user) : res.sendStatus(401);
});

app.post("/api/auth/logout", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logOut((error) => {
        if (error) return res.sendStatus(400);
    });
    return res.sendStatus(200);
});

app.post("/api/cart", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ msg: "Not Authenticated" });
    }
    const { body: item } = req;
    const { cart } = req.session;
    if (!cart) {
        req.session.cart = [item];
    } else {
        cart.push(item);
    }
    return res.status(200).send(item);
});

app.get("/api/cart", (req, res) => {
    if (!req.session.user) return res.status(401);
    return res.status(200).send(req.session.cart ?? []);
});

// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
