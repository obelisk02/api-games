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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Empty' });
    }
    const user = yield user_1.default.findOne({ username }).exec();
    if (!user) {
        return res.status(400).json({ error: 'username not found' });
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'invalid password' });
    }
    const token = jsonwebtoken_1.default.sign({
        username: 'sd',
        id: 1
    }, config_1.default.secrets.token);
    return res.status(200).json({
        message: 'success',
        token
    });
});
//********************************* */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ error: 'username or password is empty' });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const passwordHash = yield bcrypt_1.default.hash(password, salt);
    const userExists = yield user_1.default.findOne({ username }).exec();
    if (userExists) {
        return res.status(400).json({ error: 'user already exists' });
    }
    const user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        password: passwordHash
    });
    const result = yield user.save();
    return res.status(200).json({
        message: 'Register user success',
        user: {
            username: result.username,
            id: result._id
        }
    });
});
exports.default = { login, register };
//# sourceMappingURL=users.js.map