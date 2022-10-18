"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const typeorm_1 = require("typeorm");
const token_1 = require("../../entity/token");
const actionToken_1 = require("../../entity/actionToken");
class TokenRepository {
    async createToken(token) {
        return (0, typeorm_1.getManager)().getRepository(token_1.Token).save(token);
    }
    async findTokenByUserId(userId) {
        return (0, typeorm_1.getManager)().getRepository(token_1.Token).findOne({ userId });
    }
    findByParams(filterObject) {
        return (0, typeorm_1.getManager)().getRepository(token_1.Token).findOne(filterObject);
    }
    async deleteByParams(params) {
        return (0, typeorm_1.getManager)().getRepository(token_1.Token).delete(params);
    }
    async createActionToken(actionToken) {
        return (0, typeorm_1.getManager)().getRepository(actionToken_1.ActionToken).save(actionToken);
    }
    async getActionToken(token) {
        return (0, typeorm_1.getManager)().getRepository(actionToken_1.ActionToken).findOne(token);
    }
    async deleteActionToken(actionToken) {
        return (0, typeorm_1.getManager)().getRepository(actionToken_1.ActionToken).delete(actionToken);
    }
}
exports.tokenRepository = new TokenRepository();
//# sourceMappingURL=tokenRepository.js.map