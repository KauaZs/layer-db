import fs from 'fs';
import get from './get';
import set  from './set';
import remove  from './remove';
import all from './all';
import push from './push';

interface LayerMethods {
  set: (path: string, data: any) => object,
  get: (path: string) => object | null,
  remove: (path: string) => boolean,
  all: () => object | null,
  push: (path: string, value: any) => any
}

export class Layer implements LayerMethods {
  public set!: (path: string, data: any) => object;
  public get!: (path: string) => object | null;
  public remove!: (path: string) => boolean;
  public all: () => object | any;
  public push!: (path: string, value: any) => any;

  constructor() {
    this.set = set;
    this.get = get;
    this.remove = remove;
    this.all = all
    this.push = push
    
    const filePath = './layer.json';
    if (fs.existsSync(filePath)) {
      
    } else {
      fs.writeFile(filePath, '', (err) => {       
        if (err) throw console.log(err);
      });
    }
  }
}


