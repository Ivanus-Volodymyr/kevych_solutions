"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const configEnv_1 = require("../configs/configEnv");
const constans_1 = require("../constans");
const app_1 = require("../app");
class EmailService {
    async sendMail(action, email, context = {}) {
        const { subject, templateName } = constans_1.EmailInfo[action];
        const templateRender = new email_templates_1.default({
            views: {
                root: path_1.default.join(app_1.rootDir, 'email.templates'),
            },
        });
        Object.assign(context, { url: configEnv_1.configEnv.forgotUrl });
        const html = await templateRender.render(templateName, context);
        const EmailTransporter = nodemailer_1.default.createTransport({
            from: 'Sep-2021',
            service: 'gmail',
            auth: {
                user: configEnv_1.configEnv.root_email,
                pass: configEnv_1.configEnv.root_email_password,
            },
        });
        return EmailTransporter.sendMail({
            to: email,
            subject,
            html,
        });
    }
}
exports.emailService = new EmailService();
//# sourceMappingURL=emailService.js.map