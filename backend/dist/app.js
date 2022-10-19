"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const apiRoute_1 = require("./routers/apiRoute");
const configEnv_1 = require("./configs/configEnv");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)({
    origin: "http://localhost:63342",
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
}));
app.use(apiRoute_1.apiRouter);
const { port } = configEnv_1.configEnv;
app.listen(port, async () => {
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected....');
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
        }
    }
    console.log(`Server has started on port ${port}..........`);
});
//# sourceMappingURL=app.js.map