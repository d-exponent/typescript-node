"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("./controllers/error"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const app_error_1 = __importDefault(require("./utils/app-error"));
const webpages_1 = __importDefault(require("./routes/webpages"));
const app = (0, express_1.default)();
const cwd = process.cwd();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.set('view engine', 'pug');
app.set('views', path_1.default.join(cwd, 'src', 'views'));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(cwd, 'src', 'public')));
// Routes
app.use('/', webpages_1.default);
app.use('/auth', auth_1.default);
app.use('/users', users_1.default);
app.use('*', (req, _, next) => {
    return next(new app_error_1.default(` ${req.method.toUpperCase()} ${req.originalUrl} is not found on this server`, 400));
});
app.use(error_1.default);
exports.default = app;
