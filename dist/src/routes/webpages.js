"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webpage_1 = require("../controllers/webpage");
const router = express_1.default.Router();
router.get('/', webpage_1.home);
router.get('/login', webpage_1.login);
router.get('/register', webpage_1.register);
exports.default = router;
