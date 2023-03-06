"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function save(data) {
    const path = './layer.json';
    try {
        fs_1.default.writeFileSync(path, JSON.stringify(data, null, ' '), 'utf-8');
    }
    catch (error) {
        console.error(`[ Layer-DB ] Erro ao salvar o arquivo ${path}: ${error}`);
    }
}
exports.default = save;
