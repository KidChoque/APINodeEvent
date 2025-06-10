const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const { AppDataSource } = require("./DataSource");

const tipoEventoRoutes = require("./routes/tipoEvento.routes");
const eventoRoutes = require("./routes/evento.routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/tipoeventos", tipoEventoRoutes);
app.use("/eventos", eventoRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EventPlus API",
      version: "1.0.0",
      description: "API para cadastro de eventos e tipos de eventos",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");

    app.use("/tipoeventos", tipoEventoRoutes);
    app.use("/eventos", eventoRoutes);

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`http://localhost:3000/api-docs`);
      
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar banco:", error);
  });


