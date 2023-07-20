import Layer from './Layer';
export default class DatabaseManager {
    layers: Array<Layer>;
    constructor();
    /**
        * Esta função cria uma nova database.
        * @param {string} dbName - O nome da db.
        * @returns {void} O resultado é a criação.
    */
    create(dbName: string): Layer;
    /**
       * Esta obtém os dados de uma db.
       * @param {string} dbName - O nome da db.
       * @returns {object} Dados da db.
   */
    getDatabase(dbName: string): Layer;
}
