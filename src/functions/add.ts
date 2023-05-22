import readDB from "../constructors/readDb";
import lodash from 'lodash'
import save
 from "../constructors/saveDB";
export default function add(path: string, number: number) {
    function verifyPath(path: string): boolean {
        const keys = path.split('.')
        return !!keys.filter(k => k.match(/\s+/g) || k == '').length
      }
    
      if (!path) throw new Error('[ Layer-DB ] Defina o primeiro argumento');
      if(!path) throw new Error('[ Layer-DB ] Defina o segundo argumento');
      if (typeof number !== 'number') throw new Error('[ Layer-DB ] O segundo argumento não é do tipo \'number\'');
      if (verifyPath(path)) return;
      
      const file = readDB();
      const newObject: any = {};
      lodash.set(newObject, path, number);
      const mergedObject = lodash.mergeWith(file[0], newObject, (objValue: any, srcValue: any) => {
        if (lodash.isNumber(objValue)) {
          return objValue + number; 
        }
      });
      file[0] = mergedObject;
    
      save(file);
      return file;
}