"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readDb_1 = __importDefault(require("../constructors/readDb"));
const lodash_1 = __importDefault(require("lodash"));
function get(path) {
    if (!path)
        throw new Error('[ Layer-DB ] Um argumento esperado');
    const file = (0, readDb_1.default)()[0];
    const result = lodash_1.default.get(file, path, null);
    return result;
}
exports.default = get;
