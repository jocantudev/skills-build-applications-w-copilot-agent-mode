"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const baseUrl_1 = require("./config/baseUrl");
const database_1 = __importDefault(require("./config/database"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = baseUrl_1.apiPort;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/api/health', (_req, res) => {
    const readyState = database_1.default.readyState;
    const baseUrl = (0, baseUrl_1.getApiBaseUrl)();
    res.status(200).json({
        status: 'ok',
        baseUrl,
        mongodbReadyState: readyState,
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend running on ${(0, baseUrl_1.getApiBaseUrl)()}`);
});
//# sourceMappingURL=index.js.map