//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose()

//criar que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

//utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {
//     //Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     //Insserir dados na tabela
//     const query = `
//     INSERT INTO PLACES (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//     ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//     'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//     'Colectoria',
//     'Rodrigues Alves',
//     'nº 665',
//     'Rio Grande do Sul',
//     'São Borja',
//     'Resíduos Eletrônicos, Lâmpadas'
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log('Cadastro realizado com sucesso!')
//         console.log(this)  
//     }

//     db.run(query, values, afterInsertData)

    //Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Aqui estão seus registros')
    //     console.log(rows)
    // })

    //Remover um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
//         if(err) {
//             return console.log(err)
//         }

//         console.log('Registro realizado com sucesso')
//      })
// })