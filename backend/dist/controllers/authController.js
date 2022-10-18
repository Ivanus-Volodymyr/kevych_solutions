"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const constans_1 = require("../constans");
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registration(req.body);
        res.cookie(constans_1.cookie.refreshToken, data.refreshToken, { maxAge: constans_1.cookie.maxAge, httpOnly: true });
        res.json(data);
    }
    async login(req, res, next) {
        try {
            const { id, lastName, email, password: hashPassword, } = req.user;
            const { password } = req.body;
            await services_1.emailService.sendMail(constans_1.EmailActionEnums.WELCOME, email, { user: lastName });
            await services_1.userService.compareUserPassword(password, hashPassword);
            const { accessToken, refreshToken, } = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
                Result: 'Ok',
            });
        }
        catch (err) {
            next(err);
        }
    }
    async logout(req, res) {
        const { id } = req.user;
        res.clearCookie(constans_1.cookie.refreshToken);
        await services_1.tokenService.deleteTokenPair(id);
        return res.json('OK');
    }
    async refresh(req, res, next) {
        try {
            const { id, email } = req.user;
            const refreshTokenToDelete = req.get('Authorization');
            await services_1.tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
            const { accessToken, refreshToken, } = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
                Result: 'Ok',
            });
        }
        catch (err) {
            next(err);
        }
    }
    async sendMail(req, res, next) {
        try {
            const { id, email, lastName } = req.user;
            const actionToken = services_1.tokenService.generateActionToken({ userId: id, userEmail: email });
            await tokenRepository_1.tokenRepository.createActionToken({ actionToken, type: constans_1.ActionTokenType.FORGOT_PASSWORD, userId: id });
            await services_1.emailService.sendMail(constans_1.EmailActionEnums.FORGOT_PASSWORD, email, { user: lastName, actionToken });
            res.json({
                Result: 'Ok',
            }).status(201);
        }
        catch (err) {
            next(err);
        }
    }
    async saveNewPassword(req, res, next) {
        try {
            const actionToken = req.get('Authorization');
            const { id } = req.user;
            await services_1.userService.UpdateUserPasswordById(req.body, id);
            await tokenRepository_1.tokenRepository.deleteActionToken({ actionToken });
            res.json('Password Updated').status(200);
            return;
        }
        catch (err) {
            next(err);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map