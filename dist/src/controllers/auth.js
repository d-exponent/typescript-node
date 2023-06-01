"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../config"));
const user_1 = __importDefault(require("../models/user"));
const generateAccessToken = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, config_1.default.JWT_SECRET);
};
const cookieManager = (id, res) => {
    let token = null;
    if (id) {
        token = generateAccessToken(id);
    }
    res.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + config_1.default.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: config_1.default.NODE_ENV === 'production'
    });
    return token;
};
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the token
    let token = undefined;
    // Check auth header for token
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1] || undefined;
    }
    else {
        token = req.cookies.jwt || undefined;
    }
    if (!token) {
        return next(new Error('You are not logged in'));
    }
    // Decode the token
    const decoded = (0, jsonwebtoken_1.verify)(token, config_1.default.JWT_SECRET);
    //check if user exits
    const currentUser = yield user_1.default.findById(decoded.id);
    if (!currentUser)
        return next(new Error('This bearer of this token no longer exists in our system'));
    req.user = currentUser;
    res.locals.user = currentUser;
    return next();
});
exports.protect = protect;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Provide the valid email and password');
    }
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            throw new Error('Provide the valid email address');
        }
        if (!user.validatePassword(password)) {
            throw new Error('Incorrect password');
        }
        res.status(200).json({
            success: true,
            data: user,
            token: cookieManager(user.id, res)
        });
    }
    catch (e) {
        res.status(500).json(JSON.parse(JSON.stringify(e)));
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUser = yield user_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: Object.assign(Object.assign({}, JSON.parse(JSON.stringify(dbUser))), { password: undefined }),
            token: cookieManager(dbUser.id, res)
        });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.register = register;
const logout = (req, res) => {
    // Destroy the cookie
    res.cookie('jwt', 'logged-out', {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: config_1.default.NODE_ENV === 'production'
    });
    res.send('Logged out successfully');
};
exports.logout = logout;
