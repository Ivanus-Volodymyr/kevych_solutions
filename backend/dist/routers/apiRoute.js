"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const trainRouter_1 = require("./trainRouter");
const router = (0, express_1.Router)();
router.use("/trains", trainRouter_1.trainRouter);
router.use("*", (err, _req, res, _next) => {
    console.log("____________________________");
    console.log(err.message);
    console.log("____________________________");
    res.status(err.status || 500).json({
        message: err.message,
        data: err.data,
    });
});
exports.apiRouter = router;
//# sourceMappingURL=apiRoute.js.map