import fs from 'fs'
export default function save (data: string[] | any) {
    const path = './layer.json';

    try {
        fs.writeFileSync(path, JSON.stringify(data, null, ' '), 'utf-8');
        
    } catch (error) {
        console.error(`[ Layer-DB ] Erro ao salvar o arquivo ${path}: ${error}`);
  }
}