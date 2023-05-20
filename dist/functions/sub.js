"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const saveDB_1 = __importDefault(require("../constructors/saveDB"));
const readDb_1 = __importDefault(require("../constructors/readDb"));
function sub(path, value) {
    function verifyPath(path) {
        const keys = path.split('.');
        return !!keys.filter(k => k.match(/\s+/g) || k == '').length;
    }
    if (!path)
        throw new Error('[ layer ] Path is not definied');
    if (!value)
        throw new Error('[ layer ] Value is not definied');
    if (typeof value !== 'number')
        throw new Error('[ layer ] Value !== number');
    if (verifyPath(path))
        return;
    const file = (0, readDb_1.default)();
    const newObject = {};
    lodash_1.default.set(newObject, path, value);
    const mergedObject = lodash_1.default.mergeWith(file[0], newObject, (objValue, srcValue) => {
        if (lodash_1.default.isNumber(objValue)) {
            return objValue - value;
        }
    });
    file[0] = mergedObject;
    (0, saveDB_1.default)(file);
    return file;
}
exports.default = sub;
