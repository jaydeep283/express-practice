import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT || 8080;

const app = express();

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
    })
);

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    res.cookie("hello", "world", { maxAge: 30000, signed: true });
    res.send("Hello World.");
});

// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
