import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
    res.status(200).send([{ id: 1, name: "Bella Vita", price: 350 }]);
});

export default router;
