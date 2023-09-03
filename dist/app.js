"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const origin = process.env.ORIGIN || 'http://localhost:3000';
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true
}));
app.use((0, morgan_1.default)('short'));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api', apiRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
