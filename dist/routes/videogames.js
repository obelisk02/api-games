"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const videogames_1 = __importDefault(require("../controllers/videogames"));
const router = express_1.default.Router();
router
    .get('/videogames', videogames_1.default.getAll)
    .get('/videogames/:id', videogames_1.default.get)
    .post('/videogames', videogames_1.default.create)
    .patch('/videogames/:id', videogames_1.default.update)
    .delete('/videogames/:id', videogames_1.default.remove);
module.exports = router;
//# sourceMappingURL=videogames.js.map