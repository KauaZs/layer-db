"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const fs_1 = __importDefault(require("fs"));
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
const remove_1 = __importDefault(require("./remove"));
class Layer {
    constructor() {
        this.set = set_1.default;
        this.get = get_1.default;
        this.remove = remove_1.default;
        const filePath = './layer.json';
        if (fs_1.default.existsSync(filePath)) {
        }
        else {
            fs_1.default.writeFile(filePath, '', (err) => {
                if (err)
                    throw console.log(err);
            });
        }
    }
}
exports.Layer = Layer;
