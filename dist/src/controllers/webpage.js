"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.home = void 0;
const home = (req, res) => {
    res.render('index.pug');
};
exports.home = home;
const login = (req, res) => {
    res.render('login.pug');
};
exports.login = login;
const register = (req, res) => {
    res.render('register.pug');
};
exports.register = register;
