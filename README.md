## Layer-DB
> É um banco de dados local
# Exemplo de uso:
```js
const Database = require('layer-db')
const db = new Database()

db.set('username', 'João')
db.get('username') // 'João'
```