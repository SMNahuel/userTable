/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require("express"); //Para el manejo del servidor Web
const exphbs = require("express-handlebars"); //Para el manejo de los HTML
const bodyParser = require("body-parser"); //Para el manejo de los strings JSON
const MySQL = require("./modulos/mysql"); //Añado el archivo mysql.js presente en la carpeta módulos

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static("public")); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" })); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set("view engine", "handlebars"); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get("/", function (req, res) {
  //Petición GET con URL = "/", lease, página principal.
  console.log(req.query); //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
  res.render("login", null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});

app.put("/login", function (req, res) {
  //Petición PUT con URL = "/login"
  console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
  res.send(null);
});

app.delete("/login", function (req, res) {
  //Petición DELETE con URL = "/login"
  console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
  res.send(null);
});

/* ------------------- Registro de usuarios ---------------------------  */
/* Mostrar la pantalla */
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  const { mail, pass, firstName, lastName } = req.body;
  const response = await MySQL.realizarQuery(
    `SELECT * FROM Users WHERE mail = "${mail}"`
  );
  if (response.length > 1) {
    return res.render("errorPage", { mensage: "Usuario registrado" });
  }

  const register = await MySQL.realizarQuery(
    `INSERT INTO users(mail, pass, firstName, lastName) VALUES ('${mail}','${pass}','${firstName}','${lastName}')`
  );
  console.log(register);
  return res.render("profile", req.body);
});

app.get("/login", function (req, res) {
  res.render("login", null);
});

app.post("/login", async function (req, res) {
  const { mail, pass } = req.body;
  const response = await MySQL.realizarQuery(
    `SELECT * FROM Users WHERE mail = "${mail}" AND pass = "${pass}"`
  );
  if (response.length < 1) {
    return res.render("errorPage", "Credenciales invalidas");
  }
  console.log(response[0]);
  res.render("profile", response[0]); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.put("/usuario", async function (req, res) {
  const { firstName, lastName, mail } = req.body;

  await MySQL.realizarQuery(
    `UPDATE users SET firstName="${firstName}",lastName="${lastName}" WHERE mail= "${mail}"`
  );
  const response = await MySQL.realizarQuery(
    `SELECT * FROM Users WHERE mail = "${mail}"`
  );
  console.log(response[0]);
  res.render("profile", response[0]);
});
