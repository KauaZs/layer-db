import fs from 'fs';
import get from '../functions/get';
import set  from '../functions/set';
import remove  from '../functions/remove';
import all from '../functions/toJson';
import push from '../functions/push';
import add from '../functions/add';
import sub from '../functions/sub';


interface LayerMethods {
  set: (path: string, data: any) => object,
  get: (path: string) => object | null,
  remove: (path: string) => boolean,
  all: () => object | null,
  push: (path: string, value: any) => any,
  add: (path: string, value: any) => object
  sub: (path: string, value: any) => object
 
}

export class Layer implements LayerMethods {
  public set!: (path: string, data: any) => object;
  public get!: (path: string) => object | null;
  public remove!: (path: string) => boolean;
  public all: () => object | any;
  public push!: (path: string, value: any) => any;
  public add!: (path: string, value: any) => any;
  public sub!: (path: string, value: any) => any;

  constructor() {
    this.set = set;
    this.get = get;
    this.remove = remove;
    this.all = all;
    this.push = push;
    this.add = add;
    this.sub = sub;
  
      
    const filePath = './layer.json';
    if (fs.existsSync(filePath)) {
      
    } else {
      fs.writeFile(filePath, '', (err) => {       
        if (err) throw console.log(err);
      });
    }
  }
}


