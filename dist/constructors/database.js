"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const fs_1 = __importDefault(require("fs"));
const get_1 = __importDefault(require("../functions/get"));
const set_1 = __importDefault(require("../functions/set"));
const remove_1 = __importDefault(require("../functions/remove"));
const toJson_1 = __importDefault(require("../functions/toJson"));
const push_1 = __importDefault(require("../functions/push"));
const add_1 = __importDefault(require("../functions/add"));
const sub_1 = __importDefault(require("../functions/sub"));
class Layer {
    constructor() {
        this.set = set_1.default;
        this.get = get_1.default;
        this.remove = remove_1.default;
        this.all = toJson_1.default;
        this.push = push_1.default;
        this.add = add_1.default;
        this.sub = sub_1.default;
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
