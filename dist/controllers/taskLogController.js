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
exports.getAllTaskLogs = void 0;
const db_1 = require("../db"); // Import the function
const getAllTaskLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = yield (0, db_1.connectToDatabase)('test-bot');
        const taskLogsCollection = dbConnection.collection('test-bot-logs'); // Specify the collection name
        const taskLogs = yield taskLogsCollection.find();
        const data = yield taskLogs.toArray();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllTaskLogs = getAllTaskLogs;
// Add more controller functions as needed
