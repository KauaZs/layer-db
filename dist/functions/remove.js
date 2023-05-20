"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const readDb_1 = __importDefault(require("../constructors/readDb"));
const saveDB_1 = __importDefault(require("../constructors/saveDB"));
function remove(path) {
    if (!path)
        throw new Error('[ Layer-DB ] um argumento esperado');
    const file = (0, readDb_1.default)();
    const existingObject = file.find((obj) => lodash_1.default.has(obj, path));
    if (existingObject) {
        lodash_1.default.unset(existingObject, path);
        (0, saveDB_1.default)(file);
        return true;
    }
    else {
        return false;
    }
}
exports.default = remove;
