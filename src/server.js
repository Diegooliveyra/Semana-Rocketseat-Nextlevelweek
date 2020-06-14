const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db");

//Configurar pasta publica
server.use(express.static("public"));

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

//Ultilizando o template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html");
});
server.get("/create-point", (req, res) => {
  //req.query : Query strings da nossa url

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //req.body: o corpo do nosso formulario

  //inserir dados no banco de dados

  const query = `
    INSERT INTO places (
      image,
     name,
       adress,
       adress2,
       state,
       city,
       items
     ) VALUES (?,?,?,?,?,?,?);
   `;

  const value = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items
  ];

  function afterInsertData(err) {
    if (err) {
       console.log("erro");
       return res.send("Erro no cadastro")
    }
    console.log("Cadastrado com sucesso");
    console.log(this);
    return res.render("create-point.html", {saved:true});
  }

  db.run(query, value, afterInsertData);

 
});

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == "") {
    return res.render("search-result.html", {total:0 });
  }

  //Pegar os dados da tabela
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log("erro");
    }

    const total = rows.length;

    //mostrar a pagina html com os dados do banco de dados
    return res.render("search-result.html", { places: rows, total });
  });
});

server.listen(3000);
