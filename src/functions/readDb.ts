import fs from 'fs';

export default function readDB() {
    const path = './layer.json';

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
