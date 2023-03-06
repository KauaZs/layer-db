import fs from 'fs';
import get from './get';
import set  from './set';
import remove  from './remove';
import all from './all';

interface LayerMethods {
  set: (path: string, data: any) => object,
  get: (path: string) => object | null,
  remove: (path: string) => boolean,
  all: () => object | null
}

export class Layer implements LayerMethods {
  public set!: (path: string, data: any) => object;
  public get!: (path: string) => object | null;
  public remove!: (path: string) => boolean;
  public all: () => object | any;

  constructor() {
    this.set = set;
    this.get = get;
    this.remove = remove;
    this.all = all
    
    const filePath = './layer.json';
    if (fs.existsSync(filePath)) {
      
    } else {
      fs.writeFile(filePath, '', (err) => {       
        if (err) throw console.log(err);
      });
    }
  }
}


