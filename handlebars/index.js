/* Importing the express module and then creating an instance of it. */
const express = require("express");
const { Container } = require("./Container");
const hbs = require("express-handlebars");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;
let container;
let mostrarLayout;

const server = app.listen(PORT, () => {
  container = new Container();
  console.log("Servidor levantado en el puerto " + server.address().port);
});

server.on("error", (error) =>
  console.log({ mensaje: `Hubo un error: ${error.message}` })
);

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
  mostrarLayout = true;
  res.render("formulario", {
    mostrar: mostrarLayout,
    productos: container.getAll(),
  });
});

app.get("/productos", (req, res) => {
  res.send(container.getAll());
});

app.get("/table", (req, res) => {
  mostrarLayout = false;
  res.render("formulario", {
    mostrar: mostrarLayout,
    productos: container.getAll(),
  });
});

app.post("/cambiarlayout", (req, res) => {
  console.log("/cambiarlayout");
  mostrarLayout = !mostrarLayout;
});

app.post("/producto", (req, res) => {
  container.addProduct(req.body);
  mostrarLayout = true;
  res.render("formulario", {
    mostrar: mostrarLayout,
    productos: container.getAll(),
  });
});
