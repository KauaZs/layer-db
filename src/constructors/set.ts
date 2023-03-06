import readDB from "../functions/readDb";
import lodash from 'lodash';
import save from "../functions/saveDB";

export default function set(path: string, value: any) : object | any {

  function verifyPath(path: string): boolean {
    const keys = path.split('.')
    return !!keys.filter(k => k.match(/\s+/g) || k == '').length
  }

  if (!path) throw new Error('[ Layer-DB ] Defina o primeiro argumento');
  if (!value) throw new Error('[ Layer-DB ] Defina o segundo argumento');
  if (verifyPath(path)) return;
  
  const file = readDB();
  const newObject: any = {};
  lodash.set(newObject, path, value);
  const mergedObject = lodash.mergeWith(file[0], newObject, (objValue: any, srcValue: any) => {
    if (lodash.isArray(objValue)) {
      return srcValue;
    }
  });
  file[0] = mergedObject;

  save(file);
  return file;
}
