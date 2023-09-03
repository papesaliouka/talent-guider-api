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
exports.TaskLogRepository = void 0;
const TaskLog_1 = __importDefault(require("../models/TaskLog"));
exports.TaskLogRepository = {
    getAllTaskLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TaskLog_1.default.find();
            }
            catch (error) {
                throw error;
            }
        });
    },
    getTaskLogByUsername(username, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = [
                {
                    '$match': {
                        'username': username,
                        'startTime': {
                            '$gte': new Date(startDate),
                            '$lte': new Date(endDate)
                        }
                    }
                }, {
                    '$project': {
                        'day': {
                            '$dayOfWeek': '$startTime',
                        },
                        'week': {
                            '$week': '$startTime',
                        },
                        startTime: 1,
                        subjectName: 1,
                        duration: {
                            '$divide': [
                                {
                                    '$subtract': ['$endTime', '$startTime']
                                },
                                60000
                            ]
                        },
                        _id: 0
                    }
                },
                {
                    '$group': {
                        '_id': '$week',
                        'subjectNames': {
                            '$push': '$subjectName',
                        },
                        'durations': {
                            '$push': '$duration',
                        },
                        days: {
                            '$push': '$day',
                        },
                        totalOfWeek: {
                            '$sum': '$duration',
                        },
                        date: {
                            '$push': '$startTime',
                        },
                    }
                },
            ];
            try {
                return yield TaskLog_1.default.aggregate(query);
            }
            catch (error) {
                throw error;
            }
        });
    },
};
