"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const Joi = __importStar(require("joi"));
const constans_1 = require("../../constans");
exports.userValidator = {
    createUser: Joi.object({
        firstName: Joi
            .string()
            .min(3)
            .max(25)
            .required(),
        lastName: Joi
            .string()
            .min(3)
            .max(25)
            .required(),
        age: Joi
            .number()
            .min(18)
            .max(90),
        phone: Joi
            .string()
            .regex(constans_1.regex.phone),
        email: Joi
            .string()
            .regex(constans_1.regex.email)
            .required(),
        password: Joi
            .string()
            .regex(constans_1.regex.password)
            .required(),
    }),
    login: Joi.object({
        email: Joi
            .string()
            .regex(constans_1.regex.email)
            .required()
            .messages({ 'string.pattern.base': 'email not valid' }),
        password: Joi
            .string()
            .required(),
    }),
    email: Joi.object({
        email: Joi
            .string()
            .regex(constans_1.regex.email)
            .required()
            .messages({ 'string.pattern.base': 'email not valid' })
            .trim(),
    }),
    password: Joi.object({
        password: Joi
            .string()
            .regex(constans_1.regex.password)
            .required()
            .messages({ 'string.pattern.base': 'password not valid' })
            .trim(),
    }),
    more: Joi.object({
        more: Joi
            .string()
            .regex(constans_1.regex.password)
            .required()
            .messages({ 'string.pattern.base': 'password not valid' })
            .trim(),
    }),
};
//# sourceMappingURL=userValidator.js.map