import { mockUsers } from "./constants.mjs";

export const resolveIndexByUserId = (req, res, next) => {
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
