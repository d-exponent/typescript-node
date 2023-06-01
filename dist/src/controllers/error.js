"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const app_error_1 = __importDefault(require("../utils/app-error"));
const errorHandler = (err, req, res, next) => {
    // PRODUCTION
    if (config_1.default.NODE_ENV === 'production') {
        if (err instanceof app_error_1.default) {
            return res.status(err.status).json({
                message: err.message,
                isOperational: err.isOperational
            });
        }
        res.status(500).json({ message: 'Something went wrong', isOperational: false });
    }
    if (config_1.default.NODE_ENV !== 'production') {
        return res.json(err);
    }
    next();
};
exports.default = errorHandler;
