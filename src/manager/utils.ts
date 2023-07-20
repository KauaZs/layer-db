import fs from 'fs'

function readDatabase(path: string) {
 
    if(!fs.existsSync(path)) {
        console.error('[ Layer-DB ] Não foi possível ler o arquivo');
        return [];
    }

    try {
        const data = fs.readFileSync(path, 'utf-8');
        const obj = JSON.parse(data);
        if(Array.isArray(obj) && obj.every(x => typeof x === 'object') || obj.length > 0) {
            return obj;
        } else {
            throw new Error('[ Layer-DB ] O arquivo não contém um array de objetos válido.');
        }
    } catch (error) {
        return [];
    }
}
function save (data: string[] | any, path: string) {

    try {
        fs.writeFileSync(path, JSON.stringify(data, null, ''), 'utf-8');
        
    } catch (error) {
        console.error(`[ Layer-DB ] Erro ao salvar o arquivo ${path}: ${error}`);
  }
}

export {
    save,
    readDatabase
}