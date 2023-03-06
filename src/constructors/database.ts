import fs from 'fs';
import get from './get';
import set  from './set';
import remove  from './remove';

interface LayerMethods {
  set: (path: string, data: any) => object,
  get: (path: string) => object | null,
  remove: (path: string) => boolean,
}

export class Layer implements LayerMethods {
  public set!: (path: string, data: any) => object;
  public get!: (path: string) => object | null;
  public remove!: (path: string) => boolean;

  constructor() {
    this.set = set;
    this.get = get;
    this.remove = remove;
    const filePath = './layer.json';
    if (fs.existsSync(filePath)) {
      
    } else {
      fs.writeFile(filePath, '', (err) => {       
        if (err) throw console.log(err);
      });
    }
  }
}


