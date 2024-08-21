import express from "express";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const resolveIndexByUserId = (req, res, next) => {
    const {
        body,
        params: { id },
    } = req;
    const userId = parseInt(id);
    if (isNaN(userId)) return res.sendStatus(400);
    const userIndex = mockUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) return res.sendStatus(404);
    req.userIndex = userIndex;
    next();
};

const mockUsers = [
    { id: 1, username: "jaydeep", displayName: "Jaydeep" },
    { id: 2, username: "itachi", displayName: "Itachi" },
    { id: 3, username: "naruto", displayName: "Naruto" },
];

app.get("/", (req, res) => {
    res.send("Hello World.");
});

app.get("/api/users", (req, res) => {
    const {
        query: { filter, value },
    } = req;
    if (filter && value) {
        res.send(mockUsers.filter((user) => user[filter].includes(value)));
    } else {
        res.send(mockUsers);
    }
});

app.post("/api/users", (req, res) => {
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    res.status(201).send(newUser);
});

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    // const userId = parseInt(req.params.id);
    // if (!isNaN(userId)) {
    //     const reqUser = mockUsers.find((user) => user.id === userId);
    //     if (!reqUser) {
    //         return res.sendStatus(404);
    //     } else {
    //         return res.send(reqUser);
    //     }
    // } else {
    //     return res.status(400).send({ msg: "Bad Request!" });
    // }
    res.send(mockUsers[userIndex]);
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    // const userId = parseInt(id);
    // if (isNaN(userId)) return res.sendStatus(400);
    // const userIndex = mockUsers.findIndex((user) => user.id === userId);
    // if (userIndex === -1) return res.sendStatus(404);
    mockUsers[userIndex] = { id: userIndex + 1, ...body };
    return res.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    // const userId = parseInt(id);
    // if (isNaN(userId)) return res.sendStatus(400);
    // const userIndex = mockUsers.findIndex((user) => user.id === userId);
    // if (userIndex === -1) return res.sendStatus(404);
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...body };
    return res.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    // const userId = parseInt(id);
    // if (isNaN(userId)) return res.sendStatus(400);
    // const userIndex = mockUsers.findIndex((user) => user.id === userId);
    // if (userIndex === -1) return res.sendStatus(404);
    mockUsers.splice(userIndex, 1);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
