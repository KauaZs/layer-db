import lodash from 'lodash';
import readDB from '../functions/readDb';
import save from '../functions/saveDB';

export default function remove(path: string) : object | any {
  if (!path) throw new Error('[ Layer-DB ] 1 argumento esperado');

  const file = readDB();
  const existingObject = file.find((obj: any) => lodash.has(obj, path));
  
  if (existingObject) {
    lodash.unset(existingObject, path);
    save(file);
    return true
  } else {
    return false
  }
}
