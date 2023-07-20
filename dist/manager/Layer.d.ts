export default class Layer {
    dbName: string;
    path: string;
    constructor(dbName: string);
    private createNewDb;
    /**
        * Esta função seta um parâmetro com seu valor.
        * @param {string} key - Caminho
        * @param {string | object | string[]} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    set(key: string, value: object | string): any;
    /**
        * Esta função obtem o valor de uma key.
        * @param {string} key - Key
        * @returns {object} Valor esperado.
    */
    get(path: string): object | any;
    /**
        * Esta função faz uma soma do valor antigo com o novo.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    add(path: string, number: number): any;
    /**
        * Esta função faz um push em uma array.
        * @param {string} key - Caminho
        * @param {number} value - Valor do parâmetro
        * @returns {object} Database salvada com seu novo parâmetro.
    */
    push(path: string | any, value: string): any;
    /**
       * Esta função remove um parâmetro
       * @param {string} key - Caminho
       * @returns {boolean} Parãmetro removido?.
   */
    remove(path: string): object | any;
    /**
      * Esta função subtrai o valor antigo com o novo.
      * @param {string} key - Caminho
      * @param {number} value - Valor do parâmetro
      * @returns {object} Database salvada com seu novo parâmetro.
  */
    sub(path: string, value: number): any;
    /**
        * Esta função retorna todos os dados da db.
        * @returns {object} Dados.
    */
    toJSON(): object | any;
}
