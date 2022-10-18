"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const authRouter_1 = require("./authRouter");
const postRouter_1 = require("./postRouter");
const commentRouter_1 = require("./commentRouter");
const userRouter_1 = require("./userRouter");
const router = (0, express_1.Router)();
router.use('/auth', authRouter_1.authRouter);
router.use('/users', userRouter_1.userRouter);
router.use('/posts', postRouter_1.postRouter);
router.use('/comments', commentRouter_1.commentRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    console.log('____________________________');
    console.log(err.message);
    console.log('____________________________');
    res.status(err.status || 500)
        .json({
        message: err.message,
        data: err.data,
    });
});
exports.apiRouter = router;
//# sourceMappingURL=apiRoute.js.map