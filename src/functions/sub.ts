import lodash from 'lodash'
import save from '../constructors/saveDB'
import readDB from '../constructors/readDb'

export default function sub(path: string, value: number) {
    function verifyPath(path: string): boolean {
        const keys = path.split('.')
        return !!keys.filter(k => k.match(/\s+/g) || k == '').length
      }

    if(!path) throw new Error('[ layer ] Path is not definied')
    if(!value) throw new Error('[ layer ] Value is not definied')

    if(typeof value !== 'number') throw new Error('[ layer ] Value !== number')

    if (verifyPath(path)) return;
      
      const file = readDB();
      const newObject: any = {};
      lodash.set(newObject, path, value);
      const mergedObject = lodash.mergeWith(file[0], newObject, (objValue: any, srcValue: any) => {
        if (lodash.isNumber(objValue)) {
          return objValue - value; 
        }
      });
      file[0] = mergedObject;
    
      save(file);
      return file;
    
}