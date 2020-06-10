//importar a denpendencia do spq3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que ira fazer operações de banco de dados

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db

// ultilizar o objeto de banco de dados, para nossas operações

// db.serialize(() => {
//   //Com comandos sql eu vou:

//   //1 - criar uma tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       adress TEXT,
//       adress2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `);

//   //2 - inserir dados na tabela
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       adress,
//       adress2,
//       state,
//       city,
//       items
//     ) VALUES (?,?,?,?,?,?,?);
//   `;

//   const value = [
//     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//     "Papersoder",
//     "Guilherme Gemballa, Jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos, Lâmpadas",
//   ];

//   // function afterInsertData(err) {
//   //   if (err) {
//   //     return console.log("erro");
//   //   }
//   //   console.log("Cadastrado com sucesso");
//   //   console.log(this);
//   // }

//   // db.run(query, value, afterInsertData);

//   //3 - consultar os dados da tabela

//   //db.all(`SELECT * FROM places`, function(err, rows) {
//   //  if (err) {
//   //    return console.log("erro");
//   //  }
//   //  console.log("Aqui estão seus registros")
//   //  console.log(rows)
//   //})

//   //4 - deletar um dado na tabela

//   // db.run(`DELETE FROM places WHERE id = ?`,[1], function(err){
//   //  if (err) {
//   //    return console.log("erro");
//   //  }
//   //  console.log("Registro deletados com sucesso")
//   //})

// });
