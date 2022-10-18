"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
const ErrorHandler_1 = require("../error/ErrorHandler");
class AuthMiddleware {
    async checkAccessToken(req, _res, next) {
        try {
            const token = req.get('Authorization');
            if (!token) {
                next(new ErrorHandler_1.ErrorHandler('no token...', 401));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(token);
            const userFromToken = await services_1.userService.GetUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler_1.ErrorHandler('wrong email...', 401));
                return;
            }
            const tokenFromDb = await tokenRepository_1.tokenRepository.findByParams({ accessToken: token });
            if (!tokenFromDb) {
                next(new ErrorHandler_1.ErrorHandler('token not valid...', 401));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkRefreshToken(req, _res, next) {
        try {
            const token = req.get('Authorization');
            if (!token) {
                next(new ErrorHandler_1.ErrorHandler('no token...', 401));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(token, 'refresh');
            const userFromToken = await services_1.userService.GetUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler_1.ErrorHandler('wrong email...', 401));
                return;
            }
            const tokenFromDb = await tokenRepository_1.tokenRepository.findByParams({ refreshToken: token });
            if (!tokenFromDb) {
                next(new ErrorHandler_1.ErrorHandler('token not valid...', 401));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkActionToken(req, _res, next) {
        try {
            const actionToken = req.get('Authorization');
            if (!actionToken) {
                next(new ErrorHandler_1.ErrorHandler('No actionToken'));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(actionToken, 'action');
            const userFromDb = await services_1.userService.GetUserByEmail(userEmail);
            if (!userFromDb) {
                next(new ErrorHandler_1.ErrorHandler('No such user in db'));
                return;
            }
            const actionTokenFromDb = await tokenRepository_1.tokenRepository.getActionToken({ actionToken });
            if (!actionTokenFromDb) {
                next(new ErrorHandler_1.ErrorHandler('No action token in db'));
                return;
            }
            req.user = userFromDb;
            next();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map