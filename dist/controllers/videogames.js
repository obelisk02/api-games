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
const videogames_1 = __importDefault(require("../models/videogames"));
const mongoose_1 = __importDefault(require("mongoose"));
//********************* GET ALL */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield videogames_1.default.find({}).exec();
    if (!data) {
        return res.status(400).json({ error: 'Games not found' });
    }
    console.log(data);
    res.status(200).json({
        message: `ok`,
        data: data
    });
});
///********************** GET ONE */
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Empty Id' });
    }
    const data = yield videogames_1.default.findOne({ "_id": (id) }).exec();
    if (!data) {
        return res.status(400).json({ error: 'Game not found' });
    }
    res.status(200).json({
        message: `Found id ${id}`,
        data: data
    });
});
//********************************* */ CREATE
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, company, year } = req.body;
    if (name === '' || company === '' || !company || year < 1800) {
        res.status(400).json({
            message: 'Name, company or year cannot be empty'
        });
        return;
    }
    /*const videogame: IVideogame = {
        name,
        company,
        year
    } */
    const videogame = new videogames_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        company,
        year,
    });
    const result = yield videogame.save();
    res.status(200).json({
        message: 'Created',
        data: result
    });
});
const update = (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: `update ${id}`
    });
};
//**************************  DELETE */
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Empty Id' });
    }
    const data = yield videogames_1.default.deleteOne({ "_id": (id) }).exec();
    if (!data) {
        return res.status(400).json({ error: 'Game not found' });
    }
    res.status(200).json({
        message: `Deleted id ${id}`,
        data: data
    });
});
exports.default = { getAll, get, create, update, remove };
//# sourceMappingURL=videogames.js.map