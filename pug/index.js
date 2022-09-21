/* Importing the express module and then creating an instance of it. */
const express = require("express");
const { Container } = require("./Container");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;
let container;

const server = app.listen(PORT, () => {
  container = new Container();
  console.log("Servidor levantado en el puerto " + server.address().port);
});

server.on("error", (error) =>
  console.log({ mensaje: `Hubo un error: ${error.message}` })
);

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("formulario");
});

app.get("/productos", (req, res) => {
  res.send(container.getAll());
});

app.get("/table", (req, res) => {
  res.render("table", { productos: container.getAll() });
});

app.post("/producto", (req, res) => {
  container.addProduct(req.body);
  res.render("formulario");
});
