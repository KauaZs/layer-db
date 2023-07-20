"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("./utils");
class Layer {
    constructor(dbName) {
        this.dbName = dbName;
        this.dbName = dbName;
        this.path = `./layer/${this.dbName}.json`;
        this.createNewDb();
    }
    createNewDb() {
        const folderPath = `./layer/`;
        const filePath = `./layer/${this.dbName}.json`;
        try {
            if (!fs_1.default.existsSync(folderPath)) {
                fs_1.default.mkdirSync(folderPath);
            }
            if (!fs_1.default.existsSync(filePath)) {
                fs_1.default.writeFile(filePath, '', () => { });
            }
        }
        catch (err) {
            console.log(`[layer-db | error] ${err.message}`);
        }
    }
    /**
        * Esta função seta um parâmetro com seu valor.
        * @param {string} key - Caminho
        * @param {string | object | string[]} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    set(key, value) {
        function verifyPath(path) {
            const keys = path.split('.');
            return !!keys.filter(k => k.match(/\s+/g) || k == '').length;
        }
        if (!key)
            throw new Error('[ Layer-DB ] Defina o primeiro argumento');
        if (typeof value === undefined)
            throw new Error('[ Layer-DB ] Defina o segundo argumento');
        if (verifyPath(key))
            return;
        const file = (0, utils_1.readDatabase)(this.path);
        const newObject = {};
        lodash_1.default.set(newObject, key, value);
        const mergedObject = lodash_1.default.mergeWith(file[0], newObject, (objValue, srcValue) => {
            if (lodash_1.default.isArray(objValue)) {
                return srcValue;
            }
        });
        file[0] = mergedObject;
        (0, utils_1.save)(file, this.path);
        return file;
    }
    /**
        * Esta função obtem o valor de uma key.
        * @param {string} key - Key
        * @returns {object} Valor esperado.
    */
    get(path) {
        if (!path)
            throw new Error('[ Layer-DB ] Um argumento esperado');
        const file = (0, utils_1.readDatabase)(this.path)[0];
        const result = lodash_1.default.get(file, path, null);
        return result;
    }
    /**
        * Esta função faz uma soma do valor antigo com o novo.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    add(path, number) {
        function verifyPath(path) {
            const keys = path.split('.');
            return !!keys.filter(k => k.match(/\s+/g) || k == '').length;
        }
        if (!path)
            throw new Error('[ Layer-DB ] Defina o primeiro argumento');
        if (!path)
            throw new Error('[ Layer-DB ] Defina o segundo argumento');
        if (typeof number !== 'number')
            throw new Error('[ Layer-DB ] O segundo argumento não é do tipo \'number\'');
        if (verifyPath(path))
            return;
        const file = (0, utils_1.readDatabase)(this.path);
        const newObject = {};
        lodash_1.default.set(newObject, path, number);
        const mergedObject = lodash_1.default.mergeWith(file[0], newObject, (objValue, srcValue) => {
            if (lodash_1.default.isNumber(objValue)) {
                return objValue + number;
            }
        });
        file[0] = mergedObject;
        (0, utils_1.save)(file, this.path);
        return file;
    }
    /**
        * Esta função faz um push em uma array.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    push(path, value) {
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
        const file = (0, utils_1.readDatabase)(this.path)[0];
        let newObject = {};
        lodash_1.default.set(newObject, path, value);
        function customizer(objValue, srcValue) {
            if (!Array.isArray(srcValue)) {
                if (!Array.isArray(objValue) && objValue)
                    objValue = [objValue];
                return (objValue === null || objValue === void 0 ? void 0 : objValue.concat(srcValue)) || [srcValue];
            }
        }
        const data = lodash_1.default.mergeWith(file, newObject, customizer);
        (0, utils_1.save)([data], this.path);
        return data;
    }
    /**
       * Esta função remove um parâmetro
       * @param {string} key - Caminho
       * @returns {boolean} Parãmetro removido?.
   */
    remove(path) {
        if (!path)
            throw new Error('[ Layer-DB ] um argumento esperado');
        const file = (0, utils_1.readDatabase)(this.path);
        const existingObject = file.find((obj) => lodash_1.default.has(obj, path));
        if (existingObject) {
            lodash_1.default.unset(existingObject, path);
            (0, utils_1.save)(file, this.path);
            return true;
        }
        else {
            return false;
        }
    }
    /**
      * Esta função subtrai o valor antigo com o novo.
      * @param {string} key - Caminho
      * @param {number} value - Valor do parâmetro
      * @returns {object} Database salvada com seu novo parâmetro.
  */
    sub(path, value) {
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
        const file = (0, utils_1.readDatabase)(this.path);
        const newObject = {};
        lodash_1.default.set(newObject, path, value);
        const mergedObject = lodash_1.default.mergeWith(file[0], newObject, (objValue, srcValue) => {
            if (lodash_1.default.isNumber(objValue)) {
                return objValue - value;
            }
        });
        file[0] = mergedObject;
        (0, utils_1.save)(file, this.path);
        return file;
    }
    /**
        * Esta função retorna todos os dados da db.
        * @returns {object} Dados.
    */
    toJSON() {
        return JSON.parse((0, utils_1.readDatabase)(this.path));
    }
}
exports.default = Layer;
