import express from "express";
import routes from "./routes/index.mjs";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World.");
});

// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
