"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./src/app"));
const port = config_1.default.PORT || 3000;
const dbUrl = `mongodb+srv://${config_1.default.DB_USERNAME}:${config_1.default.DB_PASSWORD}@cluster0.ntzames.mongodb.net/${config_1.default.DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(dbUrl)
    .then(() => {
    app_1.default.listen(port, () => console.log('[SERVER]: Server is running on port', port));
})
    .catch((err) => console.error('🛑Error Connecting to database', err.message));
