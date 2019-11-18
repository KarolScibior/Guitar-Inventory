"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT;
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map