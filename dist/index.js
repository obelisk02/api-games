"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config/config"));
const videogames_1 = __importDefault(require("./routes/videogames"));
const users_1 = __importDefault(require("./routes/users"));
const middleware_1 = __importDefault(require("./controllers/middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
//Express app
const app = (0, express_1.default)();
mongoose_1.default.connect(config_1.default.mongo.url)
    .then((result) => {
    console.log("Mongo connected");
}).catch((error) => {
    console.log(error);
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/**
 * app.use( (req:Request, res: Response, next: NextFunction)=>{
    logger.info(
        `METHOD: [${req.method}] - URL - [${req.url}] - IP [000]`
    )
})
 */
app.use('/api', users_1.default); //public 
app.use('/api', middleware_1.default.verifiedToken, videogames_1.default); //privates
app.use((req, res) => {
    const error = new Error("Not Found");
    res.status(400).json({ error: 'not found' });
});
const port = process.env.SERVER_PORT || 3000;
app.get('/', (req, res) => {
    res.send(" typescript1");
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map