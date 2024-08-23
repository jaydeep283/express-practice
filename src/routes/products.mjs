import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
    // console.log(req.cookies);
    // console.log(req.headers.cookie);
    // console.log(req.signedCookies);

    if (req.signedCookies.hello && req.signedCookies.hello === "world")
        return res
            .status(200)
            .send([{ id: 1, name: "Bella Vita", price: 350 }]);
    return res.status(400).send({ msg: "You must have valid cookies" });
});

export default router;
