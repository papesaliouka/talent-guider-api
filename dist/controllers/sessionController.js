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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionValidity = void 0;
const sessionRepository_1 = require("../repositories/sessionRepository");
const checkSessionValidity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionID = req.cookies.sid;
        if (sessionID) {
            const data = yield sessionRepository_1.SessionRepository.findByUserID(sessionID);
            if (!data) {
                return res.status(401).json({ valid: false, user: null });
            }
            return res.status(200).json({ valid: true,
                user: {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                }
            });
        }
        else {
            return res.status(401).json({ valid: false, user: null });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.checkSessionValidity = checkSessionValidity;
