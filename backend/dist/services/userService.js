"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
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
        return userRepository_1.userRepository.createUser(user);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map