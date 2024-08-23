import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import {
    queryParamsValidationSchema,
    createUserValidationSchema,
} from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const usersRouter = Router();

usersRouter.get(
    "/api/users",
    checkSchema(queryParamsValidationSchema),
    (req, res) => {
        console.log(req.session.id);
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(sessionData);
        });
        // const {
        //     query: { filter, value },
        // } = req;
        const result = validationResult(req);
        const data = matchedData(req);
        console.log(data);
        console.log(result);
        const { filter, value } = data;
        if (filter && value) {
            res.send(mockUsers.filter((user) => user[filter].includes(value)));
        } else {
            res.send(mockUsers);
        }
    }
);

usersRouter.post(
    "/api/users",
    checkSchema(createUserValidationSchema),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        const validData = matchedData(req);
        // const { body } = req;
        const newUser = {
            id: mockUsers[mockUsers.length - 1].id + 1,
            ...validData,
        };
        mockUsers.push(newUser);
        res.status(201).send(newUser);
    }
);

usersRouter.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
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

usersRouter.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    // const userId = parseInt(id);
    // if (isNaN(userId)) return res.sendStatus(400);
    // const userIndex = mockUsers.findIndex((user) => user.id === userId);
    // if (userIndex === -1) return res.sendStatus(404);
    mockUsers[userIndex] = { id: userIndex + 1, ...body };
    return res.sendStatus(200);
});

usersRouter.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, userIndex } = req;
    // const userId = parseInt(id);
    // if (isNaN(userId)) return res.sendStatus(400);
    // const userIndex = mockUsers.findIndex((user) => user.id === userId);
    // if (userIndex === -1) return res.sendStatus(404);
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...body };
    return res.sendStatus(200);
});

usersRouter.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { userIndex } = req;
    // const userId = parseInt(id);
    // if (isNaN(userId)) return res.sendStatus(400);
    // const userIndex = mockUsers.findIndex((user) => user.id === userId);
    // if (userIndex === -1) return res.sendStatus(404);
    mockUsers.splice(userIndex, 1);
    res.sendStatus(200);
});

export default usersRouter;
