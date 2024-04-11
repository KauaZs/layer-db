# layer-db

[![npm version](https://img.shields.io/npm/v/layer-db.svg)](https://www.npmjs.com/package/layer-db)
[![License](https://img.shields.io/npm/l/layer-db.svg)](https://github.com/KauaZs/layer-db/)

**layer-db** é uma biblioteca npm para gerenciar um banco de dados local de forma simples e eficiente.

## Instalação

Para instalar a biblioteca, basta executar o seguinte comando no terminal:

```bash
npm install layer-db
```
## Exemplo de uso: 
```js
const LayerDB = require('layer-db')

const db = new LayerDB()
const users = db.create('users')

users.set('joao', {idade: 12})
```

## Documentação:
> https://unionlab.gitbook.io/docs