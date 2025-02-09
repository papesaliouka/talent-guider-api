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
exports.UserRepository = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.UserRepository = {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ email });
            }
            catch (error) {
                throw error;
            }
        });
    },
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ username });
            }
            catch (error) {
                throw error;
            }
        });
    },
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ _id: id });
            }
            catch (error) {
                throw error;
            }
        });
    },
    createUser(email, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User_1.default({
                    username,
                    email,
                    password,
                });
                return yield newUser.save();
            }
            catch (error) {
                throw error;
            }
        });
    },
};
