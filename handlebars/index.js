/* Importing the express module and then creating an instance of it. */
const express = require("express");
const { Container } = require("./Container");
const hbs = require("express-handlebars");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8081;
let container;

const server = app.listen(PORT, () => {
  container = new Container();
  console.log("Servidor levantado en el puerto " + server.address().port);
});

server.on("error", (error) =>
  console.log({ mensaje: `Hubo un error: ${error.message}` })
);

const productosList = [];

//--------------------------------------------

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "formulario.hbs",
    layoutsDir: "./views",
    partialsDir: "./views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//--------------------------------------------

app.get("/", (req, res) => {
  res.render("formulario");
});

app.get("/productos", (req, res) => {
  res.send(container.getAll());
});

app.get("/table", (req, res) => {
  res.render("table", { productos: productosList });
});

app.post("/producto", (req, res) => {
  container.addProduct(req.body);
  productosList.push(req.body);
  res.render("formulario");
});
