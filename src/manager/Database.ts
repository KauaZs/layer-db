import { Layer } from './Layer'

export class DatabaseManager {
    public layers: Array<Layer>
    constructor() {
        this.layers = []
    }

    /**
        * Esta função cria uma nova database.
        * @param {string} dbName - O nome da db.
        * @returns {void} O resultado é a criação.
    */
     public create(dbName: string) : Layer {   
         const layer = new Layer(dbName)
         this.layers.push(layer)
         return layer
     }
    /**
        * Esta obtém os dados de uma db.
        * @param {string} dbName - O nome da db.
        * @returns {object} Dados da db.
    */
     public getDatabase(dbName: string) : Layer {
        const layer = this.layers.find(x => x.dbName === dbName)    
        if(!layer) throw new Error('[layer-db | error] Database não encontrada')
        return layer as Layer
     }
}