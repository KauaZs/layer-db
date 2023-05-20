import lodash from 'lodash';
import readDB from '../constructors/readDb';
import save from '../constructors/saveDB';

export default function remove(path: string) : object | any {
  if (!path) throw new Error('[ Layer-DB ] um argumento esperado');

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
