import lodash from 'lodash'
import readDB from '../constructors/readDb'
import save from '../constructors/saveDB'
export default function push(path: string | any, value: string) {
    if(!path) throw new Error('[ Layer-DB ] Defina o path.')
    if(!value) throw new Error('[ Layer-DB ] Defina o valor.')

    function verifyPath(path: string): boolean {
        const keys = path.split('.')
        return !!keys.filter(k => k.match(/\s+/g) || k == '').length
      }
    if (verifyPath(path)) return;

    const file = readDB()[0]
    let newObject : any = {}
    lodash.set(newObject, path, value)
    
    function customizer (objValue: any, srcValue: any) {
        if(!Array.isArray(srcValue)) {

            if(!Array.isArray(objValue) && objValue) objValue = [objValue]
            return objValue?.concat(srcValue) || [srcValue]
        }
    }
    const data = lodash.mergeWith(file, newObject, customizer)
    save([data])
    return data
   
}