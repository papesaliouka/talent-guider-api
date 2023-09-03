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
exports.getTaskLogByUserID = exports.getAllTaskLogs = void 0;
const logsRepository_1 = require("../repositories/logsRepository");
const sessionRepository_1 = require("../repositories/sessionRepository");
const getAllTaskLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionID = req.cookies.sid;
        if (!sessionID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const taskLogs = yield logsRepository_1.TaskLogRepository.getAllTaskLogs();
        res.json(taskLogs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllTaskLogs = getAllTaskLogs;
const getTaskLogByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionID = req.cookies.sid;
        if (!sessionID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = yield sessionRepository_1.SessionRepository.findByUserID(sessionID);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        const endDate = new Date();
        const taskLogs = yield logsRepository_1.TaskLogRepository.getTaskLogByUsername(user.username, startDate.toISOString(), endDate.toISOString());
        res.json(taskLogs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getTaskLogByUserID = getTaskLogByUserID;
