"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readDb_1 = __importDefault(require("../functions/readDb"));
function all() {
    return (0, readDb_1.default)();
}
exports.default = all;
