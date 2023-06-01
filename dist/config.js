"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getConfig = () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_USERNAME: process.env.DB_USERNAME,
        DB: process.env.DB,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined
    };
};
const getSanitzedConfig = (config) => {
    Object.entries(config).forEach((entry) => {
        const [key, value] = entry;
        if (key === 'PORT')
            return;
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    });
    return config;
};
const sanitizedConfig = getSanitzedConfig(getConfig());
exports.default = sanitizedConfig;
