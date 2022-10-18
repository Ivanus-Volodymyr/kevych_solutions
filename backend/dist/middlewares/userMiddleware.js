"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const userRepository_1 = require("../repositories/user/userRepository");
const validators_1 = require("../validators");
const ErrorHandler_1 = require("../error/ErrorHandler");
class UserMiddleware {
    async isUserExistInDB(req, _res, next) {
        try {
            const userFromDB = await userRepository_1.userRepository.getUserByEmail(req.body.email);
            if (!userFromDB) {
                next(new ErrorHandler_1.ErrorHandler('User not found...', 401));
                return;
            }
            req.user = userFromDB;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkUserFields(req, _res, next) {
        try {
            const { error, value } = validators_1.userValidator.createUser.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler('enter all fields...'));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkUserFieldsOnLogin(req, _res, next) {
        try {
            const { error, value } = validators_1.userValidator.login.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message, 401));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    checkUserid(req, _res, next) {
        try {
            const { error, value } = validators_1.paramsValidator.id.validate(req.params);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message, 401));
                return;
            }
            req.params = value;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    checkEmail(req, _res, next) {
        try {
            const { error, value } = validators_1.userValidator.email.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message, 401));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    checkInputPasswords(req, _res, next) {
        try {
            const { password, again } = req.body;
            if (password !== again) {
                next(new ErrorHandler_1.ErrorHandler('Passwords do not match', 401));
                return;
            }
            const { error, value } = validators_1.userValidator.password.validate({ password });
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message, 401));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map