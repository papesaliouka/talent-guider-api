"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskLogController_1 = require("../controllers/taskLogController");
const commitMessageController_1 = require("../controllers/commitMessageController");
const authController_1 = require("../controllers/authController");
const sessionController_1 = require("../controllers/sessionController");
const router = express_1.default.Router();
router.get('/tasks', taskLogController_1.getTaskLogByUserID);
router.get('/commits', commitMessageController_1.getAllCommitMessages);
router.post('/auth/login', authController_1.login);
router.post('/auth/register', authController_1.register);
router.get('/auth/check-session', sessionController_1.checkSessionValidity);
router.get('/auth/logout', authController_1.logout);
// Add more routes as needed
exports.default = router;
