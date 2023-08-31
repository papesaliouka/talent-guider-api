"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    name: 'sid',
    secret: SESSION_SECRET,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false,
}));
// Routes
app.use('/api', apiRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
