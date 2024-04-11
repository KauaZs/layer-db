import fs from 'fs'
import lodash from 'lodash'
import { save, readDatabase } from './utils'
export class Layer {
    path: string

    constructor(public dbName: string) {
        this.dbName = dbName
        this.path = `./layer/${this.dbName}.json`
        
        this.createNewDb()
    }
    
    private createNewDb() : void {
        const folderPath = `./layer/`
        const filePath = `./layer/${this.dbName}.json`
        try {
            if(!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath)
            }
            if(!fs.existsSync(filePath)) {
                fs.writeFile(filePath, '', () => {})
            }
        } catch (err : any) {
            console.log(`[layer-db | error] ${err.message}`)
        }
    }

    private verifyPath(path: string): boolean {
      const keys = path.split('.')
      return !!keys.filter(k => k.match(/\s+/g) || k == '').length
    }
    
    /**
        * Esta função seta um parâmetro com seu valor.
        * @param {string} key - Caminho
        * @param {string | object | string[]} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    set(key: string, value: object | string) {
          if (!key) throw new Error('[ Layer-DB ] Defina o primeiro argumento');
          if (typeof value === undefined) throw new Error('[ Layer-DB ] Defina o segundo argumento');
          if (this.verifyPath(key)) return;
          
          const file = readDatabase(this.path);
          const newObject: any = {};
          lodash.set(newObject, key, value);
          const mergedObject = lodash.mergeWith(file[0], newObject, (objValue: any, srcValue: any) => {
            if (lodash.isArray(objValue)) {
              return srcValue;
            }
          });
          file[0] = mergedObject;
        
          save(file, this.path);
          return file;
    }

    /**
        * Esta função obtem o valor de uma key.
        * @param {string} key - Key
        * @returns {object} Valor esperado.
    */
    get(path: string) : object | any {

        if(!path) throw new Error('[ Layer-DB ] Um argumento esperado')
    
        const file = readDatabase(this.path)[0]
        
        const result = lodash.get(file, path, null)
        return result
    }

    /**
        * Esta função faz uma soma do valor antigo com o novo.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */

    add(path: string, number: number) {
          if (!path) throw new Error('[ Layer-DB ] Defina o primeiro argumento');
          if(!path) throw new Error('[ Layer-DB ] Defina o segundo argumento');
          if (typeof number !== 'number') throw new Error('[ Layer-DB ] O segundo argumento não é do tipo \'number\'');
          if (this.verifyPath(path)) return;
          
          const file = readDatabase(this.path);
          const newObject: any = {};
          lodash.set(newObject, path, number);
          const mergedObject = lodash.mergeWith(file[0], newObject, (objValue: any, srcValue: any) => {
            if (lodash.isNumber(objValue)) {
              return objValue + number; 
            }
          });
          file[0] = mergedObject;
        
          save(file, this.path);
          return file;
    }

    /**
        * Esta função faz um push em uma array.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */

    push(path: string | any, value: string) {
        if(!path) throw new Error('[ Layer-DB ] Defina o path.')
        if(!value) throw new Error('[ Layer-DB ] Defina o valor.')
    
        
        if (this.verifyPath(path)) return;
    
        const file = readDatabase(this.path)[0]
        let newObject : any = {}
        lodash.set(newObject, path, value)
        
        function customizer (objValue: any, srcValue: any) {
            if(!Array.isArray(srcValue)) {
    
                if(!Array.isArray(objValue) && objValue) objValue = [objValue]
                return objValue?.concat(srcValue) || [srcValue]
            }
        }
        const data = lodash.mergeWith(file, newObject, customizer)
        save([data], this.path)
        return data
    }

     /**
        * Esta função remove um parâmetro
        * @param {string} key - Caminho
        * @returns {boolean} Parãmetro removido?.
    */

    remove(path: string) : object | any {
        if (!path) throw new Error('[ Layer-DB ] um argumento esperado');
      
        const file = readDatabase(this.path);
        const existingObject = file.find((obj: any) => lodash.has(obj, path));
        
        if (existingObject) {
          lodash.unset(existingObject, path);
          save(file, this.path);
          return true
        } else {
          return false
        }
      }

      /**
        * Esta função subtrai o valor antigo com o novo.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */

      sub(path: string, value: number) {
        if(!path) throw new Error('[ layer ] Path is not definied')
        if(!value) throw new Error('[ layer ] Value is not definied')
    
        if(typeof value !== 'number') throw new Error('[ layer ] Value !== number')
    
        if (this.verifyPath(path)) return;
          
          const file = readDatabase(this.path);
          const newObject: any = {};
          lodash.set(newObject, path, value);
          const mergedObject = lodash.mergeWith(file[0], newObject, (objValue: any, srcValue: any) => {
            if (lodash.isNumber(objValue)) {
              return objValue - value; 
            }
          });
          file[0] = mergedObject;
        
          save(file, this.path);
          return file;
        
    }

    /**
        * Essa função seta um objeto na database
        * @param {object} object - Objeto
        * @returns {object} Database atual com o objeto inserido.
    */
    insert(obj: object) {
      if (!obj) throw new Error('[ layer ] object is not defined')
      const file = readDatabase(this.path);

      const mergedObject = lodash.mergeWith(file[0], obj,(objValue: any, srcValue: any) => {
        if (lodash.isArray(objValue)) {
          return srcValue;
        }
      });
      file[0] = mergedObject
      save(file, this.path)

      return file;
    }

    /**
        * Esta função retorna todos os dados da db.
        * @returns {object} Dados.
    */

    toJSON() : object {
        return JSON.parse(readDatabase(this.path))
    }
}