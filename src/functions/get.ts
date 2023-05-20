import readDB from "../constructors/readDb";
import lodash from 'lodash'
export default function get(path: string) : object | any {

    if(!path) throw new Error('[ Layer-DB ] Um argumento esperado')

    const file = readDB()[0]
    
    const result = lodash.get(file, path, null)
    return result
}