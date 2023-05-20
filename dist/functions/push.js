"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const readDb_1 = __importDefault(require("../constructors/readDb"));
const saveDB_1 = __importDefault(require("../constructors/saveDB"));
function push(path, value) {
    if (!path)
        throw new Error('[ Layer-DB ] Defina o path.');
    if (!value)
        throw new Error('[ Layer-DB ] Defina o valor.');
    function verifyPath(path) {
        const keys = path.split('.');
        return !!keys.filter(k => k.match(/\s+/g) || k == '').length;
    }
    if (verifyPath(path))
        return;
    const file = (0, readDb_1.default)()[0];
    let newObject = {};
    lodash_1.default.set(newObject, path, value);
    function customizer(objValue, srcValue) {
        if (!Array.isArray(srcValue)) {
            if (!Array.isArray(objValue) && objValue)
                objValue = [objValue];
            return objValue?.concat(srcValue) || [srcValue];
        }
    }
    const data = lodash_1.default.mergeWith(file, newObject, customizer);
    (0, saveDB_1.default)([data]);
    return data;
}
exports.default = push;
