"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskLogController_1 = require("../controllers/taskLogController");
const commitMessageController_1 = require("../controllers/commitMessageController");
const router = express_1.default.Router();
router.get('/taskLogs', taskLogController_1.getAllTaskLogs);
router.get('/commitMessages', commitMessageController_1.getAllCommitMessages);
// Add more routes as needed
exports.default = router;
