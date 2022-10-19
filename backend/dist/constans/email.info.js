"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInfo = void 0;
const enums_1 = require("./enums");
exports.EmailInfo = {
    [enums_1.EmailActionEnums.WELCOME]: {
        subject: "Hello it is welcome mail",
        templateName: "welcome",
    },
    [enums_1.EmailActionEnums.ACCOUNT_BLOCK]: {
        subject: "Block",
        templateName: "block",
    },
    [enums_1.EmailActionEnums.FORGOT_PASSWORD]: {
        subject: "Forgot password",
        templateName: "forgot",
    },
};
//# sourceMappingURL=email.info.js.map