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
exports.mongoConnect = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connection.once('open', () => {
    console.log('MongoDB connection ready');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error(err);
});
const URI = process.env.MONGO_URI || "";
const connectToDatabase = (dbname) => __awaiter(void 0, void 0, void 0, function* () {
    const dbConnection = mongoose_1.default.createConnection(`${URI}/${dbname}`, options);
    return dbConnection;
});
exports.connectToDatabase = connectToDatabase;
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(URI, options);
    console.log('MongoDB connected');
});
exports.mongoConnect = mongoConnect;
