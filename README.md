## Layer-DB
> Layer-DB um banco de dados local que salva as informações.
# Exemplo de uso:
```js
const Database = require('layer-db')
const db = new Database()

db.set('username', 'João')
db.get('username') // 'João'
```