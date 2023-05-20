"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function readDB() {
    const path = './layer.json';
    if (!fs_1.default.existsSync(path)) {
        console.error('[ Layer-DB ] Não foi possível ler o arquivo');
        return [];
    }
    try {
        const data = fs_1.default.readFileSync(path, 'utf-8');
        const obj = JSON.parse(data);
        if (Array.isArray(obj) && obj.every(x => typeof x === 'object') || obj.length > 0) {
            return obj;
        }
        else {
            throw new Error('[ Layer-DB ] O arquivo não contém um array de objetos válido.');
        }
    }
    catch (error) {
        return [];
    }
}
exports.default = readDB;
