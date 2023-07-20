"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = __importDefault(require("./Layer"));
class DatabaseManager {
    constructor() {
        this.layers = [];
    }
    /**
        * Esta função cria uma nova database.
        * @param {string} dbName - O nome da db.
        * @returns {void} O resultado é a criação.
    */
    create(dbName) {
        const layer = new Layer_1.default(dbName);
        this.layers.push(layer);
        return layer;
    }
    /**
       * Esta obtém os dados de uma db.
       * @param {string} dbName - O nome da db.
       * @returns {object} Dados da db.
   */
    getDatabase(dbName) {
        const layer = this.layers.find(x => x.dbName === dbName);
        if (!layer)
            throw new Error('[layer-db | error] Database não encontrada');
        return layer;
    }
}
exports.default = DatabaseManager;
