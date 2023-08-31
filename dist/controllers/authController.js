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
exports.logout = exports.login = exports.register = void 0;
const authRepository_1 = require("../repositories/authRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        const existingUser = yield authRepository_1.UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingUsername = yield authRepository_1.UserRepository.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield authRepository_1.UserRepository.createUser(email, username, hashedPassword);
        if (!newUser) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authRepository_1.UserRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.sessionID = user._id;
        const sessionData = {
            id: user._id,
            maxAge: 24 * 60 * 60 * 1000,
            originalMaxAge: 24 * 60 * 60 * 1000,
        };
        req.session.cookie = sessionData;
        req.session.save();
        res.cookie("sid", req.sessionID.toString(), { maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ message: 'User logged in successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.clearCookie('sid');
        res.status(200).json({ message: 'User logged out successfully' });
    });
});
exports.logout = logout;
