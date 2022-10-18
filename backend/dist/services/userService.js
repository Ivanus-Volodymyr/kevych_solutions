"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/user/userRepository");
class UserService {
    async UpdateUserById(user, id) {
        return userRepository_1.userRepository.UpdateUserById(user, id);
    }
    async GetUserById(id) {
        return userRepository_1.userRepository.getUserById(id);
    }
    async GetUserByEmail(email) {
        return userRepository_1.userRepository.getUserByEmail(email);
    }
    async DeleteUser(id) {
        return userRepository_1.userRepository.deleteUser(id);
    }
    async GetUsers() {
        return userRepository_1.userRepository.getUsers();
    }
    async CreateUser(user) {
        const { password } = user;
        const newPassword = await UserService._hashPassword(password);
        const newUser = { ...user, password: newPassword };
        return userRepository_1.userRepository.createUser(newUser);
    }
    async compareUserPassword(password, hash) {
        const isPasswordUniq = await bcrypt_1.default.compare(password, hash);
        if (!isPasswordUniq) {
            throw new Error('User is not exist...');
        }
    }
    static _hashPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    async UpdateUserPasswordById(user, id) {
        let { password } = user;
        if (password) {
            password = await UserService._hashPassword(password);
        }
        return userRepository_1.userRepository.UpdateUserPasswordById(user, id);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map